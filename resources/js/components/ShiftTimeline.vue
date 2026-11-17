<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import EmployeeAvatar from '@/components/timeline/EmployeeAvatar.vue';
import TimelineShiftCell from '@/components/timeline/TimelineShiftCell.vue';
import TimelineToolbar from '@/components/timeline/TimelineToolbar.vue';
import { Skeleton } from '@/components/ui/skeleton';
import { CUSTOM_SHIFT_COLOR, templateColor, type ShiftColor } from '@/lib/shift-colors';
import { formatTime } from '@/lib/time';
import { useEmployeesStore } from '@/stores/employees.store';
import { useScheduleStore } from '@/stores/schedule.store';
import { useShiftTemplatesStore } from '@/stores/shift-templates.store';
import type { IShift, TDateString } from '@/types/api';

const employeesStore = useEmployeesStore();
const shiftTemplatesStore = useShiftTemplatesStore();
const scheduleStore = useScheduleStore();

const { viewMode, search, days } = storeToRefs(scheduleStore);

/** 220px под сотрудника + колонка на каждый день. Число колонок динамическое, поэтому inline style. */
const gridStyle = computed(() => ({
    gridTemplateColumns: `220px repeat(${days.value.length}, minmax(${viewMode.value === 'week' ? 100 : 64}px, 1fr))`,
}));

const visibleEmployees = computed(() => {
    const query = search.value.trim().toLowerCase();

    if (!query) {
        return employeesStore.list;
    }

    return employeesStore.list.filter((employee) => employee.full_name.toLowerCase().includes(query));
});

const cellKey = (employeeId: number, date: TDateString): string => `${employeeId}:${date}`;

/** Смена по ключу «сотрудник:дата». Один проход вместо поиска в массиве на каждую ячейку. */
const shiftsByCell = computed(() => {
    const map = new Map<string, IShift>();

    for (const employee of employeesStore.list) {
        for (const shift of employee.shifts ?? []) {
            map.set(cellKey(employee.id, shift.date), shift);
        }
    }

    return map;
});

/** Сколько смен стоит на каждую дату (по всем сотрудникам, без учёта поиска). */
const coverageByDate = computed(() => {
    const coverage = new Map<TDateString, number>();

    for (const shift of shiftsByCell.value.values()) {
        coverage.set(shift.date, (coverage.get(shift.date) ?? 0) + 1);
    }

    return coverage;
});

const timeRangeKey = (start: string, end: string): string => `${formatTime(start)}-${formatTime(end)}`;

/** Смена берёт цвет шаблона с тем же временем, иначе считается «своей». */
const colorByTimeRange = computed(() => {
    const colors = new Map<string, ShiftColor>();

    shiftTemplatesStore.list.forEach((template, index) => {
        const key = timeRangeKey(template.start_time, template.end_time);

        if (!colors.has(key)) {
            colors.set(key, templateColor(index));
        }
    });

    return colors;
});

function colorFor(shift: IShift | undefined): ShiftColor {
    if (!shift) {
        return CUSTOM_SHIFT_COLOR;
    }

    return colorByTimeRange.value.get(timeRangeKey(shift.start_time, shift.end_time)) ?? CUSTOM_SHIFT_COLOR;
}

const isFirstLoad = computed(() => employeesStore.loading && employeesStore.list.length === 0);
</script>

<template>
    <div class="flex h-full min-h-0 flex-col gap-5">
        <TimelineToolbar v-model:search="search" v-model:mode="viewMode" />

        <div class="min-h-0 flex-1 overflow-auto">
            <div class="grid min-w-max" :style="gridStyle" role="grid" aria-label="График смен">
                <div class="sticky top-0 z-20 col-span-full grid grid-cols-subgrid border-b bg-card" role="row">
                    <div
                        class="sticky left-0 z-10 flex items-center bg-card p-3 text-base leading-6 text-muted-foreground"
                        role="columnheader"
                    >
                        Сотрудник
                    </div>

                    <div
                        v-for="day in days"
                        :key="day.date"
                        class="flex items-center justify-center text-muted-foreground"
                        :class="viewMode === 'week' ? 'p-3 text-base leading-6' : 'flex-col px-1 py-2'"
                        role="columnheader"
                    >
                        <template v-if="viewMode === 'week'">{{ day.weekday }} {{ day.dayOfMonth }}</template>
                        <template v-else>
                            <span class="text-xs leading-4">{{ day.weekday }}</span>
                            <span class="text-sm leading-5">{{ day.dayOfMonth }}</span>
                        </template>
                    </div>
                </div>

                <template v-if="isFirstLoad">
                    <div v-for="index in 4" :key="index" class="col-span-full p-1">
                        <Skeleton class="h-16 rounded-lg" />
                    </div>
                </template>

                <div
                    v-else-if="visibleEmployees.length === 0"
                    class="col-span-full p-6 text-center text-base text-muted-foreground"
                >
                    {{ search ? 'Никого не нашли' : 'Сотрудников пока нет' }}
                </div>

                <template v-else>
                   <div
                    v-for="(employee, index) in visibleEmployees"
                    :key="employee.id"
                    class="col-span-full grid grid-cols-subgrid"
                    :class="index % 2 === 1 ? 'bg-row-alt' : 'bg-card'"
                    role="row"
                >
                    <div
                        class="sticky left-0 z-10 flex h-18 items-center gap-2 bg-inherit py-3 pr-3 pl-2"
                        role="rowheader"
                    >
                        <EmployeeAvatar :src="employee.avatar_path" :alt="employee.full_name" />

                        <div class="min-w-0 flex-1">
                            <p class="truncate text-base leading-6">{{ employee.full_name }}</p>
                            <p v-if="employee.status" class="truncate text-xs leading-4 text-muted-foreground">
                                {{ employee.status }}
                            </p>
                        </div>
                    </div>

                    <TimelineShiftCell
                        v-for="day in days"
                        :key="day.date"
                        :shift="shiftsByCell.get(cellKey(employee.id, day.date))"
                        :color="colorFor(shiftsByCell.get(cellKey(employee.id, day.date)))"
                        :mode="viewMode"
                    />
                </div>
                </template>

                <div class="sticky bottom-0 z-20 col-span-full grid grid-cols-subgrid border-t bg-card" role="row">
                    <div
                        class="sticky left-0 z-10 flex items-center bg-card p-3 text-base leading-6 text-muted-foreground"
                        role="rowheader"
                    >
                        Покрытие
                    </div>

                    <div
                        v-for="day in days"
                        :key="day.date"
                        class="flex items-center justify-center p-3 text-base leading-6"
                        :class="
                            coverageByDate.get(day.date)
                                ? 'bg-coverage-filled text-coverage-filled-foreground'
                                : 'bg-coverage-empty text-coverage-empty-foreground'
                        "
                        role="gridcell"
                    >
                        {{ coverageByDate.get(day.date) ?? 0 }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
