import { http } from '@/api/http'
import type { IApiCollection, IShiftTemplate } from '@/types/api'

export const fetchShiftTemplates = () => {
    return http.get<IApiCollection<IShiftTemplate>>('/shift-templates')
}
