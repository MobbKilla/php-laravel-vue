<script setup lang="ts">
import { ArrowRightIcon, CalendarDaysIcon } from '@lucide/vue';
import { RouterLink } from 'vue-router';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
</script>

<template>
    <div class="flex flex-1 items-center justify-center p-6">
        <RouterLink
            :to="{ name: 'schedule' }"
            class="group block w-full max-w-md rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
            <Card class="transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg">
                <CardHeader class="gap-3">
                    <div class="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <CalendarDaysIcon class="size-6" />
                    </div>

                    <CardTitle class="flex items-center justify-between text-xl">
                        График смен
                        <ArrowRightIcon
                            class="size-5 text-muted-foreground transition duration-200 group-hover:translate-x-1 group-hover:text-foreground"
                        />
                    </CardTitle>

                    <CardDescription>
                        Назначайте сотрудникам смены, применяйте шаблоны и сохраняйте расписание.
                    </CardDescription>
                </CardHeader>
            </Card>
        </RouterLink>
    </div>
</template>
