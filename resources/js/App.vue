<script setup lang="ts">
import { RouterView } from 'vue-router';

import AppSidebar from '@/components/AppSidebar.vue';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
</script>

<template>
    <SidebarProvider>
        <AppSidebar />

        <SidebarInset>
            <div class="px-4 pt-4 md:hidden">
                <SidebarTrigger />
            </div>

            <RouterView />
        </SidebarInset>
    </SidebarProvider>
</template>
