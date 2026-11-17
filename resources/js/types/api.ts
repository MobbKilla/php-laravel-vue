// Обёртки Laravel
export interface IApiCollection<T> { data: T[] }
export interface IApiItem<T> { data: T }
export interface IValidationErrorResponse {     // ответ 422
    message: string;
    errors: Record<string, string[]>;           // 'changes.3' → ['...']
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
export type ShiftTemplatePayload = Omit<IShiftTemplate, 'id'>;   // для POST/PATCH

export interface IEmployee {
    id: number;
    name: string;
    email: string;
    phone: string;
    position: string;
}
export type EmployeePayload = Omit<IEmployee, 'id'>;
