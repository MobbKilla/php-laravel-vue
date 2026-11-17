import { createRouter, createWebHistory } from 'vue-router';

declare module 'vue-router' {
    interface RouteMeta {
        title?: string;
    }
}

const APP_TITLE = 'График смен';

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/pages/HomePage.vue'),
            meta: { title: 'Главная' },
        },
        {
            path: '/schedule',
            name: 'schedule',
            component: () => import('@/pages/SchedulePage.vue'),
            meta: { title: 'График смен' },
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('@/pages/NotFoundPage.vue'),
            meta: { title: 'Страница не найдена' },
        },
    ],
});

router.afterEach((to) => {
    document.title = to.meta.title && to.meta.title !== APP_TITLE ? `${to.meta.title} · ${APP_TITLE}` : APP_TITLE;
});
