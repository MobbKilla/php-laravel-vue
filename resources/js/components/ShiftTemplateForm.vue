<script setup lang="ts">
import { computed, reactive } from 'vue';

import { ValidationError } from '@/api/http';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useShiftTemplatesStore } from '@/stores/shift-templates.store';
import type { ShiftTemplatePayload } from '@/types/api';

const emit = defineEmits<{
    created: [];
}>();

const shiftTemplatesStore = useShiftTemplatesStore();

const createEmptyForm = (): ShiftTemplatePayload => ({
    name: '',
    description: '',
    start_time: '',
    end_time: '',
});

const form = reactive<ShiftTemplatePayload>(createEmptyForm());

const labelClass = 'text-xs leading-[1.4] font-normal text-muted-foreground';

const fieldErrors = computed<Record<string, string[]>>(() =>
    shiftTemplatesStore.error instanceof ValidationError ? shiftTemplatesStore.error.errors : {},
);

function errorFor(field: keyof ShiftTemplatePayload): string | undefined {
    return fieldErrors.value[field]?.[0];
}

async function submit(): Promise<void> {
    try {
        await shiftTemplatesStore.createTemplate({ ...form });
        Object.assign(form, createEmptyForm());
        emit('created');
    } catch {
        // Ошибки уже лежат в сторе: ошибки валидации показываются под полями.
    }
}
</script>

<template>
    <form class="flex flex-col gap-4" novalidate @submit.prevent="submit">
        <div class="flex flex-col gap-1">
            <Label for="template-name" :class="labelClass">Название</Label>
            <Input
                id="template-name"
                v-model="form.name"
                placeholder="Например, Утро"
                :aria-invalid="errorFor('name') ? true : undefined"
            />
            <p v-if="errorFor('name')" class="text-sm text-destructive">{{ errorFor('name') }}</p>
        </div>

        <div class="flex flex-col gap-1">
            <Label for="template-description" :class="labelClass">Описание</Label>
            <Input
                id="template-description"
                v-model="form.description"
                placeholder="Необязательно"
                :aria-invalid="errorFor('description') ? true : undefined"
            />
            <p v-if="errorFor('description')" class="text-sm text-destructive">{{ errorFor('description') }}</p>
        </div>

        <div class="grid grid-cols-2 gap-2">
            <div class="flex flex-col gap-1">
                <Label for="template-start" :class="labelClass">Начало</Label>
                <Input
                    id="template-start"
                    v-model="form.start_time"
                    type="time"
                    :aria-invalid="errorFor('start_time') ? true : undefined"
                />
                <p v-if="errorFor('start_time')" class="text-sm text-destructive">{{ errorFor('start_time') }}</p>
            </div>

            <div class="flex flex-col gap-1">
                <Label for="template-end" :class="labelClass">Конец</Label>
                <Input
                    id="template-end"
                    v-model="form.end_time"
                    type="time"
                    :aria-invalid="errorFor('end_time') ? true : undefined"
                />
                <p v-if="errorFor('end_time')" class="text-sm text-destructive">{{ errorFor('end_time') }}</p>
            </div>
        </div>

        <Button type="submit" size="xl" :disabled="shiftTemplatesStore.loading">Создать шаблон</Button>
    </form>
</template>
