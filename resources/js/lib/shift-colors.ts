/** Набор классов для одного цвета смены. Полные имена классов, чтобы Tailwind их нашёл. */
export interface ShiftColor {
    /** Левая полоска карточки шаблона */
    border: string;
    /** Фон ячейки со сменой */
    cell: string;
    /** Основной текст в ячейке */
    text: string;
    /** Длительность в ячейке */
    accent: string;
}

/** Цвета шаблонов по порядку, как в макете: Утро, День, Вечер. */
export const TEMPLATE_COLORS: ShiftColor[] = [
    {
        border: 'border-l-template-blue',
        cell: 'bg-shift-blue',
        text: 'text-foreground',
        accent: 'text-shift-blue-foreground',
    },
    {
        border: 'border-l-template-purple',
        cell: 'bg-shift-purple',
        text: 'text-foreground',
        accent: 'text-shift-purple-foreground',
    },
    {
        border: 'border-l-template-mint',
        cell: 'bg-shift-mint',
        text: 'text-foreground',
        accent: 'text-shift-mint-foreground',
    },
];

/** «Своя смена», которая не совпадает ни с одним шаблоном. */
export const CUSTOM_SHIFT_COLOR: ShiftColor = {
    border: 'border-l-primary',
    cell: 'bg-primary',
    text: 'text-primary-foreground',
    accent: 'text-primary-foreground',
};

export function templateColor(index: number): ShiftColor {
    return TEMPLATE_COLORS[index % TEMPLATE_COLORS.length] ?? CUSTOM_SHIFT_COLOR;
}
