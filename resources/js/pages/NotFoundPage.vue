<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { Button } from '@/components/ui/button';
</script>

<template>
    <div class="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
        <p class="text-6xl font-semibold text-muted-foreground">404</p>
        <p class="text-muted-foreground">Такой страницы нет</p>
        <Button as-child variant="outline">
            <RouterLink :to="{ name: 'home' }">На главную</RouterLink>
        </Button>
    </div>
</template>
