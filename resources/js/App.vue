<script setup lang="ts">
import { onMounted, ref } from "vue";
import ShiftTemplates from "./components/ShiftTemplates.vue";

</script>

<template>
    <main class="flex flex-col min-h-screen items-center justify-center">
        <h1 class="text-2xl font-semibold">График смен</h1>

        <ShiftTemplates></ShiftTemplates>
    </main>
</template>
