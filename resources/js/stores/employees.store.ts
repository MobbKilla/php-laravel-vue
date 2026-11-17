import { defineStore } from 'pinia';
import { ApiError, handleApiError, ValidationError } from '@/api/http';
import type { IEmployee } from '@/types/api';
import { ref } from 'vue';
import { fetchEmployees } from '@/api/employees.api';

export const useEmployeesStore = defineStore('employees', () => {
    const list = ref<IEmployee[]>([]);

    const loading = ref(false);
    const error = ref<ApiError | ValidationError | string | null>(null);

    const fetchEmployeesList = async () => {
        loading.value = true;
        error.value = null;

        try {
            list.value = await fetchEmployees();

            return list.value;
        } catch (err: unknown) {
            error.value = handleApiError(err);

            throw err;
        } finally {
            loading.value = false;
        }
    };

    return {
        list,
        loading,
        error,
        fetchEmployeesList,
    };
});

// export const useShiftTemplatesStore = defineStore('employees', {
//     state: () => ({
//         list: [] as IShiftTemplate[],
//         loading: false,
//         error: null as ApiError | ValidationError | string | null,
//     }),

//     getters: {
//         templateCount: (state) => state.list.length,
//     },

//     actions: {
//         async fetchTemplates() {
//             this.loading = true;
//             this.error = null;

//             try {

//                 this.list = await fetchShiftTemplates();

//                 return this.list;
//             } catch (error: unknown) {
//                 this.error = handleApiError(error);

//                 throw error;
//             } finally {
//                 this.loading = false;
//             }
//         },

//         async createTemplate(payload: Partial<IShiftTemplate>) {
//             this.loading = true;
//             this.error = null;

//             try {
//                 const data = await createShiftTemplate(payload);

//                 this.list.unshift(data);

//                 return data;
//             } catch (error: unknown) {
//                 this.error = handleApiError(error);

//                 throw error;
//             } finally {
//                 this.loading = false;
//             }
//         },

//         async updateTemplate(id: number, payload: Partial<IShiftTemplate>) {
//             this.loading = true;
//             this.error = null;

//             try {
//                 const data = await updateShiftTemplate(id, payload);
//                 const index = this.list.findIndex((template) => template.id === id);

//                 if (index !== -1) {
//                     this.list[index] = data;
//                 } else {
//                     this.list.unshift(data);
//                 }

//                 return data;
//             } catch (error: unknown) {
//                 this.error = handleApiError(error);

//                 throw error;
//             } finally {
//                 this.loading = false;
//             }
//         },

//         async deleteTemplate(id: number) {
//             this.loading = true;
//             this.error = null;

//             try {
//                 await http.delete(`/shift-templates/${id}`);
//                 this.list = this.list.filter((template) => template.id !== id);
//             } catch (error: unknown) {
//                 this.error = handleApiError(error);

//                 throw error;
//             } finally {
//                 this.loading = false;
//             }
//         },

//         findById(id: number) {
//             return this.list.find((template) => template.id === id) ?? null;
//         },
//     },
// });
