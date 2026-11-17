import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { getPeriodDays, type TimelineViewMode } from '@/lib/date';

/**
 * Состояние экрана графика: какой период показываем и что ищем.
 * Сюда же потом лягут черновик изменений и выделенные ячейки.
 */
export const useScheduleStore = defineStore('schedule', () => {
    const viewMode = ref<TimelineViewMode>('week');
    const anchorDate = ref(new Date());
    const search = ref('');

    const days = computed(() => getPeriodDays(anchorDate.value, viewMode.value));

    /** Границы периода, пригодятся для запроса /api/employees?from=&to= */
    const period = computed(() => ({
        from: days.value[0]?.date,
        to: days.value[days.value.length - 1]?.date,
    }));

    return {
        viewMode,
        anchorDate,
        search,
        days,
        period,
    };
});
