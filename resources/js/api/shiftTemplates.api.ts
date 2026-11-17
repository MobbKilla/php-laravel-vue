import { http } from '@/api/http'
import type { IApiCollection, IApiItem, IShiftTemplate } from '@/types/api'

export const fetchShiftTemplates = async () => {
    const { data } = await http.get<IApiCollection<IShiftTemplate>>('/shift-templates')

    return data;
}

export const createShiftTemplate = async (payload: Partial<IShiftTemplate>) => {
    const { data } = await http.post<IApiItem<IShiftTemplate>>('/shift-templates', payload);

    return data;
}

export const updateShiftTemplate = async (id: number, payload: Partial<IShiftTemplate>) => {
    const { data } = await http.patch<IApiItem<IShiftTemplate>>(`/shift-templates/${id}`, payload);

    return data;
}
