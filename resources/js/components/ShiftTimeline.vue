

<script setup lang="ts">
import { useEmployeesStore } from '@/stores/employees.store';
import { computed, reactive } from 'vue';
import Input from './ui/input/Input.vue';

const employeesStore = useEmployeesStore();

const filter = reactive({
    search: '',
    range: 'week', // 'week' | 'month' | 'custom'
});

const date = new Date();
// const daysInCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

const timelineDays = computed(() => {
    if (filter.range === 'week') {
        return 7;
    }

    const date = new Date();

    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
});

</script>

<template>
    <div class="flex flex-col">
        Дней в месяце: {{ timelineDays }}
        <div class="flex gap-2">
            <div class="flex-1">
                <Input v-model="filter.search" placeholder="Поиск сотрудника" />
            </div>

            <div class="flex-2">
                <label>
                    <input type="radio" value="week" v-model="filter.range" />
                    Неделя
                </label>

                <label>
                    <input type="radio" value="month" v-model="filter.range" />
                    Месяц
                </label>

                <!-- <label>
                    <input type="radio" value="custom" v-model="filter.range" />
                    Пользовательский
                </label> -->
            </div>
        </div>


        <div class="grid gap-4" :class="[`grid-cols-${timelineDays}`]">
            <template v-for="employee in employeesStore.list" :key="employee.id">
                <div class="flex gap-4">
                    <div>{{ employee.id }} dada</div>

                    <div>
                        <div class="text-md font-medium ">{{ employee.name }}</div>
                        <div class="text-xs text-neutral-400"> {{ employee.position }} </div>
                    </div>
                </div>

                <div v-for="day in timelineDays" :key="day" class="text-md font-medium text-neutral-400 bg-neutral-300">
                    {{ day }}
                </div>
            </template>




        </div>


    </div>
</template>

<style scoped>

</style>
