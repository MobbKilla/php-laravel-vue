<script setup lang="ts">
import { computed, ref } from 'vue';

import { ValidationError } from '@/api/http';
import plusIcon from '@/assets/icons/plus.svg';
import CustomShiftForm from '@/components/CustomShiftForm.vue';
import ShiftTemplateForm from '@/components/ShiftTemplateForm.vue';
import ShiftTemplateList from '@/components/ShiftTemplateList.vue';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { useShiftTemplatesStore } from '@/stores/shift-templates.store';

const shiftTemplatesStore = useShiftTemplatesStore();

const isCreateSheetOpen = ref(false);

const isFirstLoad = computed(() => shiftTemplatesStore.loading && shiftTemplatesStore.list.length === 0);

/** Общая ошибка запроса. Ошибки валидации показывает форма под полями. */
const generalError = computed(() => {
    const error = shiftTemplatesStore.error;

    if (!error || error instanceof ValidationError) {
        return null;
    }

    return typeof error === 'string' ? error : error.message;
});

const onShiftTemplateCreated = () => {
    isCreateSheetOpen.value = false;
    shiftTemplatesStore.fetchTemplates().catch(() => undefined);
};
</script>

<template>
    <div class="flex flex-col gap-6 rounded-xl bg-card p-4">
        <section class="flex flex-col gap-2">
            <div class="flex items-center justify-between gap-2">
                <h2 class="text-base leading-6">Шаблоны смен</h2>

                <Sheet v-model:open="isCreateSheetOpen">
                    <SheetTrigger as-child>
                        <Button variant="ghost" size="icon" aria-label="Новый шаблон" title="Новый шаблон">
                            <img :src="plusIcon" alt="" class="size-5" />
                        </Button>
                    </SheetTrigger>

                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Новый шаблон</SheetTitle>
                            <SheetDescription>Шаблон можно назначать сотрудникам в графике.</SheetDescription>
                        </SheetHeader>

                        <ShiftTemplateForm class="px-4" @created="onShiftTemplateCreated" />
                    </SheetContent>
                </Sheet>
            </div>

            <p v-if="generalError" class="text-sm text-destructive">{{ generalError }}</p>

            <div v-if="isFirstLoad" class="flex flex-col gap-1">
                <Skeleton v-for="index in 3" :key="index" class="h-16 rounded-lg" />
            </div>
            <ShiftTemplateList v-else :list="shiftTemplatesStore.list" />
        </section>

        <CustomShiftForm />
    </div>
</template>
