<script setup lang="ts">
import type { TimelineViewMode } from '@/lib/date';
import type { ShiftColor } from '@/lib/shift-colors';
import { formatShiftDuration, formatShiftRange } from '@/lib/time';
import type { IShift } from '@/types/api';

defineProps<{
    shift?: IShift;
    color: ShiftColor;
    mode: TimelineViewMode;
}>();
</script>

<template>
    <div class="flex h-18 p-1" role="gridcell">
        <div
            v-if="shift"
            class="flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg p-1 whitespace-nowrap"
            :class="color.cell"
        >
            <template v-if="mode === 'week'">
                <span class="text-base leading-6" :class="color.text">
                    {{ formatShiftRange(shift.start_time, shift.end_time) }}
                </span>
                <span class="text-xs leading-4" :class="color.accent">
                    {{ formatShiftDuration(shift.start_time, shift.end_time) }}
                </span>
            </template>

            <span v-else class="text-base leading-6 font-semibold" :class="color.accent">
                {{ formatShiftDuration(shift.start_time, shift.end_time) }}
            </span>
        </div>

        <div v-else class="flex-1 rounded-lg border border-dashed" />
    </div>
</template>
