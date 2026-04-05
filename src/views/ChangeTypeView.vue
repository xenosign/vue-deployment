<template>
  <div class="change-screen">
    <h1>테스트 타입 변경</h1>
    <p class="sub">현재 타입: <strong :class="`current-${currentGroup.toLowerCase()}`">{{ currentGroup }} 타입</strong></p>
    <div class="button-group">
      <button
        class="select-btn type-a"
        :class="{ active: currentGroup === 'A' }"
        @click="changeType('A')"
      >
        A 타입{{ currentGroup === 'A' ? ' (현재)' : '' }}
      </button>
      <button
        class="select-btn type-b"
        :class="{ active: currentGroup === 'B' }"
        @click="changeType('B')"
      >
        B 타입{{ currentGroup === 'B' ? ' (현재)' : '' }}
      </button>
    </div>
    <p class="note">※ 식별 ID는 유지되며 테스트 그룹만 변경됩니다.</p>
    <button class="btn-back" @click="router.back()">← 뒤로가기</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { event } from 'vue-gtag';
import { clearStayTimeEntry } from '@/composables/useAbTest';

const router = useRouter();
const testName = 'main_test_v1';
const currentGroup = ref('');

onMounted(() => {
  const saved = localStorage.getItem(`ab_test_${testName}`);
  if (!saved) {
    router.replace('/');
    return;
  }
  currentGroup.value = saved;
});

const changeType = (type) => {
  if (type === currentGroup.value) return;

  // UUID(ab_test_user_id)는 건드리지 않고 그룹만 변경
  localStorage.setItem(`ab_test_${testName}`, type);

  // 타입이 실제로 변경될 때만 체류 시간 측정 초기화
  clearStayTimeEntry();

  event('ab_type_changed', {
    event_category: 'ab_test',
    event_label: type,
    from_group: currentGroup.value,
    test_name: testName,
  });

  router.push('/test');
};
</script>

<style scoped>
.change-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 56px);
  gap: 1.5rem;
  padding: 2rem;
}

h1 {
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0;
}

.sub {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
}

.current-a {
  color: #4f8ef7;
}

.current-b {
  color: #f74f6d;
}

.button-group {
  display: flex;
  gap: 1.5rem;
}

.select-btn {
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  border: 3px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.1s, opacity 0.1s, box-shadow 0.1s;
  opacity: 0.55;
}

.select-btn.active {
  opacity: 1;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.15);
}

.select-btn:not(.active):hover {
  opacity: 0.85;
  transform: scale(1.04);
}

.select-btn:not(.active) {
  cursor: pointer;
}

.select-btn.active {
  cursor: default;
}

.type-a {
  background-color: #4f8ef7;
  color: #fff;
}

.type-b {
  background-color: #f74f6d;
  color: #fff;
}

.note {
  font-size: 0.8rem;
  color: #9ca3af;
  margin: 0;
}

.btn-back {
  padding: 0.6rem 1.4rem;
  background: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-back:hover {
  background: #e5e7eb;
}
</style>
