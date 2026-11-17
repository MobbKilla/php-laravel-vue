import { http } from '@/api/http'
import type { IApiCollection, IApiItem, IEmployee } from '@/types/api'

export const fetchEmployees = async () => {
    const { data } = await http.get<IApiCollection<IEmployee>>('/employees')

    return data;
}

export const createEmployee = async (payload: Partial<IEmployee>) => {
    const { data } = await http.post<IApiItem<IEmployee>>('/employees', payload);

    return data;
}

export const updateEmployee = async (id: number, payload: Partial<IEmployee>) => {
    const { data } = await http.patch<IApiItem<IEmployee>>(`/employees/${id}`, payload);

    return data;
}
