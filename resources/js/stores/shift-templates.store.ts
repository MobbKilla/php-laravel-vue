import { defineStore } from 'pinia';
import { handleApiError, http } from '@/api/http';
import { fetchShiftTemplates } from '@/api/shiftTemplates';
import type { IShiftTemplate, IApiCollection, IApiItem } from '@/types/api';

export const useShiftTemplatesStore = defineStore('shift-templates', {
    state: () => ({
        list: [] as IShiftTemplate[],
        loading: false,
        error: null as string | null,
    }),

    getters: {
        templateCount: (state) => state.list.length,
    },

    actions: {
        async fetchTemplates() {
            this.loading = true;
            this.error = null;

            try {
                const { data } = await http.get<IApiCollection<IShiftTemplate>>('/shift-templates');

                this.list = data;

                return data;
            } catch (error: unknown) {
                this.error = handleApiError(error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async createTemplate(payload: Partial<IShiftTemplate>) {
            this.loading = true;
            this.error = null;

            try {
                const { data } = await http.post<IApiItem<IShiftTemplate>>('/shift-templates', payload);

                this.list.unshift(data);

                return data;
            } catch (error: unknown) {
                this.error = handleApiError(error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async updateTemplate(id: number, payload: Partial<IShiftTemplate>) {
            this.loading = true;
            this.error = null;

            try {
                const { data } = await http.patch<IApiItem<IShiftTemplate>>(`/shift-templates/${id}`, payload);
                const index = this.list.findIndex((template) => template.id === id);

                if (index !== -1) {
                    this.list[index] = data;
                } else {
                    this.list.unshift(data);
                }

                return data;
            } catch (error: unknown) {
                this.error = handleApiError(error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async deleteTemplate(id: number) {
            this.loading = true;
            this.error = null;

            try {
                await http.delete(`/shift-templates/${id}`);
                this.list = this.list.filter((template) => template.id !== id);
            } catch (error: unknown) {
                this.error = handleApiError(error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        findById(id: number) {
            return this.list.find((template) => template.id === id) ?? null;
        },
    },
});
