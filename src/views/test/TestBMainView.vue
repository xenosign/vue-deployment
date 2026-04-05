<template>
  <div class="page-container">
    <div class="hero">
      <span class="badge-label">버전 B</span>
      <h1>메인 페이지</h1>
      <p class="desc">B 타입 메인 화면입니다. 버튼을 클릭하거나 상세 페이지로 이동해보세요.</p>
      <div class="actions">
        <button class="btn-primary" @click="handleCtaClick">지금 구매하기</button>
        <RouterLink to="/test/b/detail" class="btn-secondary">상세 보기</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { logEvent } from '@/composables/useAbTest';

const handleCtaClick = () => logEvent('click', 'B');
</script>

<style scoped>
.page-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.badge-label {
  background: #ffe4e8;
  color: #be123c;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 99px;
}

h1 {
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
}

.desc {
  color: #6b7280;
  max-width: 400px;
  line-height: 1.6;
  margin: 0;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.btn-primary {
  padding: 0.75rem 2rem;
  background: #f74f6d;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
}

.btn-primary:hover {
  opacity: 0.85;
}

.btn-secondary {
  padding: 0.75rem 2rem;
  background: #f3f4f6;
  color: #374151;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.15s;
}

.btn-secondary:hover {
  background: #e5e7eb;
}
</style>
