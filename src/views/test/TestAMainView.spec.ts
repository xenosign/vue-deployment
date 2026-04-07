import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import TestAMainView from './TestAMainView.vue';
import { logEvent } from '@/composables/useAbTest';

// 1. Composable 함수 모킹
vi.mock('@/composables/useAbTest', () => ({
  logEvent: vi.fn(),
}));

describe('MainPage.vue (Version A) 테스트', () => {
  // 2. Router 설정 (RouterLink 인식을 위해 필요)
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/test/a/detail', component: { template: '<div></div>' } },
    ],
  });

  it('텍스트와 배지가 올바르게 렌더링되어야 한다', () => {
    const wrapper = mount(TestAMainView, {
      global: { plugins: [router] },
    });

    expect(wrapper.find('.badge-label').text()).toBe('버전 A');
    expect(wrapper.find('h1').text()).toBe('메인 페이지');
  });

  it('구매하기 버튼 클릭 시 logEvent가 호출되어야 한다', async () => {
    const wrapper = mount(TestAMainView, {
      global: { plugins: [router] },
    });

    // 버튼 클릭
    await wrapper.find('.btn-primary').trigger('click');

    // logEvent 호출 및 인자 검증
    expect(logEvent).toHaveBeenCalledWith('click', 'A');
  });

  it('상세 보기 링크의 경로가 올바르게 설정되어야 한다', () => {
    const wrapper = mount(TestAMainView, {
      global: { plugins: [router] },
    });

    const link = wrapper.findComponent({ name: 'RouterLink' });
    expect(link.props('to')).toBe('/test/a/detail');
  });
});
