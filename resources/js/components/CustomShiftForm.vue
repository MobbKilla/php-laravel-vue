<script setup lang="ts">
import { reactive } from 'vue';

import plusIcon from '@/assets/icons/plus.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { TTimeString } from '@/types/api';

export interface CustomShift {
    start_time: TTimeString;
    end_time: TTimeString;
}

const emit = defineEmits<{
    apply: [shift: CustomShift];
}>();

const shift = reactive<CustomShift>({
    start_time: '09:00',
    end_time: '17:00',
});

const labelClass = 'text-xs leading-[1.4] font-normal text-muted-foreground';
</script>

<template>
    <section class="flex flex-col gap-2">
        <h2 class="text-base leading-6">Своя смена</h2>

        <div class="flex gap-2">
            <div class="flex min-w-0 flex-1 flex-col gap-1">
                <Label for="custom-shift-start" :class="labelClass">Начало</Label>
                <Input id="custom-shift-start" v-model="shift.start_time" type="time" />
            </div>

            <div class="flex min-w-0 flex-1 flex-col gap-1">
                <Label for="custom-shift-end" :class="labelClass">Конец</Label>
                <Input id="custom-shift-end" v-model="shift.end_time" type="time" />
            </div>
        </div>

        <Button variant="secondary" size="xl" class="w-full" @click="emit('apply', { ...shift })">
            <img :src="plusIcon" alt="" class="size-6" />
            Поставить в выделенные
        </Button>
    </section>
</template>
