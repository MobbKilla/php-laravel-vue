// Обёртки Laravel
export interface IApiCollection<T> {
    data: T[];
}
export interface IApiItem<T> {
    data: T;
}
export interface IValidationErrorResponse {
    // ответ 422
    message: string;
    errors: Record<string, string[]>; // 'changes.3' → ['...']
}

/** 'YYYY-MM-DD' */
export type TDateString = string;
/** 'HH:MM' */
export type TTimeString = string;

export interface IShiftTemplate {
    id: number;
    name: string;
    description: string;
    start_time: TTimeString;
    end_time: TTimeString;
}
export type ShiftTemplatePayload = Omit<IShiftTemplate, 'id'>; // для POST/PATCH

export interface IShift {
    id: number;
    employee_id: number;
    date: TDateString;
    start_time: TTimeString;
    end_time: TTimeString;
}

/** Повторяет то, что отдаёт EmployeeResource (сейчас это все колонки таблицы employees). */
export interface IEmployee {
    id: number;
    full_name: string;
    status: string | null;
    avatar_path: string | null;
    /** Смены за период. Появятся в ответе, когда API начнёт их отдавать. */
    shifts?: IShift[];
}
export type EmployeePayload = Pick<IEmployee, 'full_name' | 'status' | 'avatar_path'>;
