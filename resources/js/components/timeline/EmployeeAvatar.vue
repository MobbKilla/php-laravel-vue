<script setup lang="ts">
import { ref, watch } from 'vue';

import avatarPlaceholder from '@/assets/icons/avatar-placeholder.svg';

const props = defineProps<{
    src: string | null;
    alt: string;
}>();

const hasLoadError = ref(false);

watch(
    () => props.src,
    () => {
        hasLoadError.value = false;
    },
);
</script>

<template>
    <div
        class="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded border-[0.5px] border-avatar bg-avatar"
    >
        <img
            v-if="src && !hasLoadError"
            :src="src"
            :alt="alt"
            loading="lazy"
            class="size-full object-cover"
            @error="hasLoadError = true"
        />
        <img v-else :src="avatarPlaceholder" alt="" />
    </div>
</template>
