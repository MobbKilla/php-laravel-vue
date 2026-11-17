<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';

import bellIcon from '@/assets/icons/bell.svg';
import calendarIcon from '@/assets/icons/calendar.svg';
import homeIcon from '@/assets/icons/home.svg';
import sidebarCollapseIcon from '@/assets/icons/sidebar-collapse.svg';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';

interface NavigationItem {
    title: string;
    routeName: string;
    icon: string;
}

const navigation: NavigationItem[] = [
    { title: 'Главная', routeName: 'home', icon: homeIcon },
    { title: 'Смены', routeName: 'schedule', icon: calendarIcon },
];

const menuButtonClass =
    'h-10 gap-3 rounded-lg text-base font-semibold data-active:font-semibold group-data-[collapsible=icon]:size-10!';

const route = useRoute();
const { state, toggleSidebar } = useSidebar();
</script>

<template>
    <Sidebar collapsible="icon">
        <SidebarHeader class="flex-row items-center justify-between pt-4 pr-4 pb-0 pl-3.5">
            <span class="text-xl leading-6 font-semibold tracking-[-0.3px] group-data-[collapsible=icon]:hidden">
                CRM
            </span>
            <button
                type="button"
                class="flex rounded-lg p-2 transition outline-none hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring"
                aria-label="Уведомления"
            >
                <img :src="bellIcon" alt="" class="size-6" />
            </button>
        </SidebarHeader>

        <SidebarContent class="pt-4 pr-4 pl-3.5">
            <SidebarMenu class="gap-0.5">
                <SidebarMenuItem v-for="item in navigation" :key="item.routeName">
                    <SidebarMenuButton
                        as-child
                        :is-active="route.name === item.routeName"
                        :tooltip="item.title"
                        :class="menuButtonClass"
                    >
                        <RouterLink :to="{ name: item.routeName }">
                            <img :src="item.icon" alt="" class="size-6 shrink-0" />
                            <span>{{ item.title }}</span>
                        </RouterLink>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarContent>

        <SidebarFooter class="pr-4 pb-4 pl-3.5">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        :class="menuButtonClass"
                        :tooltip="state === 'collapsed' ? 'Развернуть меню' : undefined"
                        @click="toggleSidebar"
                    >
                        <img :src="sidebarCollapseIcon" alt="" class="size-6 shrink-0" />
                        <span>Свернуть меню</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
</template>
