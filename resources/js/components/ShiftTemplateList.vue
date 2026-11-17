<script setup lang="ts">
import { templateColor } from '@/lib/shift-colors';
import { formatShiftDuration, formatTime } from '@/lib/time';
import type { IShiftTemplate } from '@/types/api';

const { list = [] } = defineProps<{ list: IShiftTemplate[] }>();
</script>

<template>
    <ul v-if="list.length" class="flex flex-col gap-1">
        <li
            v-for="(template, index) in list"
            :key="template.id"
            class="flex items-start gap-3 rounded-lg border-l-3 bg-muted py-2 pr-2 pl-4"
            :class="templateColor(index).border"
            :title="template.description || undefined"
        >
            <div class="min-w-0 flex-1 text-base leading-6">
                <p class="truncate font-semibold">{{ template.name }}</p>
                <p class="flex gap-1">
                    <span>{{ formatTime(template.start_time) }} - {{ formatTime(template.end_time) }}</span>
                    <span>·</span>
                    <span>{{ formatShiftDuration(template.start_time, template.end_time) }}</span>
                </p>
            </div>

            <kbd v-if="index < 9" class="rounded bg-card px-2 py-0.5 font-sans text-xs leading-4 font-semibold">
                {{ index + 1 }}
            </kbd>
        </li>
    </ul>

    <p v-else class="text-sm text-muted-foreground">Шаблонов пока нет</p>
</template>
