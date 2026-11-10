<script setup lang="ts">
const stack: string[] = ['Laravel', 'Vue 3', 'TypeScript'];
</script>

<template>
    <main class="flex min-h-screen items-center justify-center">
        <h1 class="text-2xl font-semibold">{{ stack.join(' + ') }}</h1>
    </main>
</template>
