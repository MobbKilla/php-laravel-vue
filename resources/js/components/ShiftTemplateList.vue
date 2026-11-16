<script setup lang="ts">
import type { IShiftTemplate } from "@/types/api";

const { list = [] } = defineProps<{ list: IShiftTemplate[] }>();
</script>

<template>
    <div>
        <h2>Shift Templates</h2>
        <ul>
            <li v-for="template in list" :key="template.id">
                {{ template.name }}
            </li>
        </ul>
    </div>
</template>

<style scoped></style>
