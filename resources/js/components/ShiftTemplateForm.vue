<script setup lang="ts">
import { reactive } from 'vue';
import type { IShiftTemplate } from '../types/api';

type TForm = Omit<IShiftTemplate, 'id'>;

const emit = defineEmits<{
    (e: 'create', form: TForm): void;
}>();

const form = reactive<TForm>({
    name: '',
    description: '',
    start_time: '',
    end_time: '',
});



const submitForm = () => {
    // Handle form submission logic here
    console.log('Form submitted:', form);

    emit('create', form);

    // fetch('/api/shift-templates', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(form),
    // })
};
</script>

<template>
    <div>
        <form @submit.prevent="submitForm">
            <input v-model="form.name" type="text" placeholder="Name" />
            <input v-model="form.description" type="text" placeholder="Description" />
            <input v-model="form.start_time" type="time" placeholder="Start Time" />
            <input v-model="form.end_time" type="time" placeholder="End Time" />
            <button type="submit">Submit</button>
        </form>

    </div>
</template>

<style scoped></style>
