<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import chevronLeftIcon from '@/assets/icons/chevron-left.svg';
import ShiftTemplates from '@/components/ShiftTemplates.vue';
import ShiftTimeline from '@/components/ShiftTimeline.vue';
import { Button } from '@/components/ui/button';
import { useEmployeesStore } from '@/stores/employees.store';
import { useShiftTemplatesStore } from '@/stores/shift-templates.store';

const router = useRouter();
const shiftTemplatesStore = useShiftTemplatesStore();
const employeesStore = useEmployeesStore();

function goBack(): void {
    if (window.history.state?.back) {
        router.back();
    } else {
        router.push({ name: 'home' });
    }
}

onMounted(() => {
    // Ошибки сохраняются в сторах и показываются в соответствующих панелях.
    shiftTemplatesStore.fetchTemplates().catch(() => undefined);
    employeesStore.fetchEmployeesList().catch(() => undefined);
});
</script>

<template>
    <div class="flex flex-1 flex-col gap-6 px-4 py-6 md:px-[30px] lg:h-svh lg:flex-none">
        <nav class="flex items-center gap-3">
            <button
                type="button"
                class="flex rounded-full bg-card p-2 transition outline-none hover:bg-card/70 focus-visible:ring-3 focus-visible:ring-ring/50"
                aria-label="Назад"
                @click="goBack"
            >
                <img :src="chevronLeftIcon" alt="" class="size-6" />
            </button>
            <span class="text-base leading-[1.4]">Графики смен</span>
        </nav>

        <div class="flex flex-wrap items-center justify-between gap-4">
            <h1 class="text-[32px] leading-8 font-medium tracking-[-1px]">График</h1>

            <div class="flex gap-1">
                <Button variant="secondary" size="xl">Опубликовать</Button>
                <Button size="xl">Сохранить</Button>
            </div>
        </div>

        <div class="flex flex-1 flex-col gap-2 lg:min-h-0 lg:flex-row">
            <section class="h-[600px] min-w-0 flex-1 rounded-xl bg-card p-3 lg:h-auto lg:min-h-0">
                <ShiftTimeline />
            </section>

            <aside class="w-full shrink-0 lg:min-h-0 lg:w-[335px]">
                <ShiftTemplates class="h-full lg:overflow-y-auto" />
            </aside>
        </div>
    </div>
</template>
