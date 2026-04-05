import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ChangeTypeView from '@/views/ChangeTypeView.vue';
import TestLayout from '@/views/test/TestLayout.vue';
import TestAMainView from '@/views/test/TestAMainView.vue';
import TestADetailView from '@/views/test/TestADetailView.vue';
import TestBMainView from '@/views/test/TestBMainView.vue';
import TestBDetailView from '@/views/test/TestBDetailView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/change-type',
      name: 'change-type',
      component: ChangeTypeView,
    },
    {
      path: '/test',
      redirect: () => {
        const group = localStorage.getItem('ab_test_main_test_v1');
        if (!group) return '/';
        return `/test/${group.toLowerCase()}`;
      },
    },
    {
      path: '/test/a',
      component: TestLayout,
      meta: { group: 'A' },
      children: [
        { path: '', name: 'test-a', component: TestAMainView },
        { path: 'detail', name: 'test-a-detail', component: TestADetailView },
      ],
    },
    {
      path: '/test/b',
      component: TestLayout,
      meta: { group: 'B' },
      children: [
        { path: '', name: 'test-b', component: TestBMainView },
        { path: 'detail', name: 'test-b-detail', component: TestBDetailView },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
});

export default router;
