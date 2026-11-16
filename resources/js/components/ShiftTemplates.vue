<script setup lang="ts">
import { onMounted } from "vue";

import ShiftTemplateForm from "./ShiftTemplateForm.vue";
import ShiftTemplateList from "./ShiftTemplateList.vue";

import { useShiftTemplatesStore } from "@/stores/shift-templates.store.js";

const shiftTemplatesStore = useShiftTemplatesStore();

const onCreate = (form: any) => {
    console.log("Shift template created:", form);
    // Handle the created event, e.g., update the list or show a notification

    shiftTemplatesStore.createTemplate(form);
};

onMounted(() => {
    shiftTemplatesStore.fetchTemplates();
});
</script>

<template>
    <div class="flex flex-col gap-2">
        <ShiftTemplateList :list="shiftTemplatesStore.list"></ShiftTemplateList>

        <ShiftTemplateForm @create="onCreate"></ShiftTemplateForm>
    </div>
</template>

<style scoped></style>
