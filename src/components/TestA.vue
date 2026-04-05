<template>
  <div class="test-container">
    <h2>버전 A 화면</h2>
    <button @click="notifyClick">지금 구매하기</button>
  </div>
</template>

<script setup>
const emit = defineEmits(['cta-click']);

const notifyClick = () => {
  emit('cta-click');
};
</script>

<style lang="scss" scoped></style>
