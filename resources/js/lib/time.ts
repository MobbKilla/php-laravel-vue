import type { TTimeString } from '@/types/api';

const MINUTES_IN_DAY = 24 * 60;

/** '09:00:00' → '09:00' */
export function formatTime(time: TTimeString): string {
    return time.slice(0, 5);
}

function toMinutes(time: TTimeString): number {
    const [hours = 0, minutes = 0] = time.split(':').map(Number);

    return hours * 60 + minutes;
}

/**
 * Длительность смены в часах. Если конец не позже начала, смена заканчивается на следующий день
 * (16:00–00:00 → 8 ч, 09:00–09:00 → 24 ч).
 */
export function shiftDurationHours(start: TTimeString, end: TTimeString): number {
    const difference = toMinutes(end) - toMinutes(start);

    return (difference > 0 ? difference : difference + MINUTES_IN_DAY) / 60;
}

/** '07:00', '15:00' → '8 ч' */
export function formatShiftDuration(start: TTimeString, end: TTimeString): string {
    const hours = shiftDurationHours(start, end);

    return `${Number.isInteger(hours) ? hours : hours.toFixed(1)} ч`;
}
