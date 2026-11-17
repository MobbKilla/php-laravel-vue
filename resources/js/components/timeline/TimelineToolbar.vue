<script setup lang="ts">
import searchIcon from '@/assets/icons/search.svg';
import type { TimelineViewMode } from '@/lib/date';

const search = defineModel<string>('search', { required: true });
const mode = defineModel<TimelineViewMode>('mode', { required: true });

const modes: { value: TimelineViewMode; label: string }[] = [
    { value: 'month', label: 'Месяц' },
    { value: 'week', label: 'Неделя' },
];
</script>

<template>
    <div class="flex flex-wrap items-stretch gap-2">
        <label
            class="flex h-12 w-full max-w-[398px] items-center gap-2.5 rounded-xl bg-muted px-3 focus-within:ring-3 focus-within:ring-ring/50"
        >
            <img :src="searchIcon" alt="" class="size-6 shrink-0" />
            <input
                v-model="search"
                type="search"
                placeholder="Поиск по ФИО"
                aria-label="Поиск по ФИО"
                class="min-w-0 flex-1 bg-transparent text-base leading-6 outline-none placeholder:text-muted-foreground"
            />
        </label>

        <div role="radiogroup" aria-label="Период" class="flex h-12 w-[301px] rounded-xl bg-muted p-0.5">
            <button
                v-for="option in modes"
                :key="option.value"
                type="button"
                role="radio"
                :aria-checked="mode === option.value"
                class="flex-1 rounded-[10px] px-6 text-base leading-6 font-semibold transition outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                :class="mode === option.value ? 'bg-control-active text-white' : 'text-foreground hover:bg-card/60'"
                @click="mode = option.value"
            >
                {{ option.label }}
            </button>
        </div>
    </div>
</template>
