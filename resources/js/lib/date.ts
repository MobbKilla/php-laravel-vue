import type { TDateString } from '@/types/api';

export type TimelineViewMode = 'week' | 'month';

export interface TimelineDay {
    date: TDateString;
    dayOfMonth: number;
    /** 'пн', 'вт', … */
    weekday: string;
}

const weekdayFormatter = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' });

/**
 * Локальная дата в формате 'YYYY-MM-DD'.
 * toISOString() не подходит: он переводит время в UTC и может сдвинуть дату на день.
 */
export function toDateString(date: Date): TDateString {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function startOfWeek(date: Date): Date {
    const daysSinceMonday = (date.getDay() + 6) % 7;

    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - daysSinceMonday);
}

/** Дни недели (с понедельника) или месяца, в который попадает anchor. */
export function getPeriodDays(anchor: Date, mode: TimelineViewMode): TimelineDay[] {
    const start = mode === 'week' ? startOfWeek(anchor) : new Date(anchor.getFullYear(), anchor.getMonth(), 1);
    const length = mode === 'week' ? 7 : new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0).getDate();

    return Array.from({ length }, (_, index) => {
        const day = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index);

        return {
            date: toDateString(day),
            dayOfMonth: day.getDate(),
            weekday: weekdayFormatter.format(day),
        };
    });
}
