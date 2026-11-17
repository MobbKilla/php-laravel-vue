import { defineStore } from 'pinia';
import { ApiError, handleApiError, http, ValidationError } from '@/api/http';
import { fetchShiftTemplates, createShiftTemplate, updateShiftTemplate } from '@/api/shiftTemplates.api';
import type { IShiftTemplate, IApiCollection, IApiItem } from '@/types/api';

export const useShiftTemplatesStore = defineStore('shift-templates', {
    state: () => ({
        list: [] as IShiftTemplate[],
        loading: false,
        error: null as ApiError | ValidationError | string | null,
    }),

    getters: {
        templateCount: (state) => state.list.length,
    },

    actions: {
        async fetchTemplates() {
            this.loading = true;
            this.error = null;

            try {

                this.list = await fetchShiftTemplates();

                return this.list;
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
                const data = await createShiftTemplate(payload);

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
                const data = await updateShiftTemplate(id, payload);
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
