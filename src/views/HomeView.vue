<template>
  <div class="selection-screen">
    <h1>테스트 화면을 선택하세요</h1>
    <div class="button-group">
      <button class="select-btn type-a" @click="selectType('A')">A 타입 선택</button>
      <button class="select-btn type-b" @click="selectType('B')">B 타입 선택</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { event } from 'vue-gtag';

const router = useRouter();

const testName = 'main_test_v1';

onMounted(() => {
  const savedGroup = localStorage.getItem(`ab_test_${testName}`);
  if (savedGroup) {
    router.replace('/test');
  }
});

const selectType = (type) => {
  localStorage.setItem(`ab_test_${testName}`, type);

  event('ab_type_selected', {
    event_category: 'ab_test',
    event_label: type,
    test_name: testName,
  });

  router.push('/test');
};
</script>

<style scoped>
.selection-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 2rem;
}

.button-group {
  display: flex;
  gap: 1.5rem;
}

.select-btn {
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.1s, opacity 0.1s;
}

.select-btn:hover {
  opacity: 0.85;
  transform: scale(1.04);
}

.type-a {
  background-color: #4f8ef7;
  color: #fff;
}

.type-b {
  background-color: #f74f6d;
  color: #fff;
}
</style>
