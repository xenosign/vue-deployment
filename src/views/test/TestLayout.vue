<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import NavHeader from '@/components/NavHeader.vue';
import { logEvent, setupStayTimeLog } from '@/composables/useAbTest';

const route = useRoute();
const router = useRouter();
const group = route.meta.group;

let cleanupStayTime = null;

onMounted(() => {
  const savedGroup = localStorage.getItem('ab_test_main_test_v1');
  if (!savedGroup) {
    router.replace('/');
    return;
  }
  if (savedGroup !== group) {
    router.replace(`/test/${savedGroup.toLowerCase()}`);
    return;
  }

  logEvent('exposure', group);
  cleanupStayTime = setupStayTimeLog(group);
});

onUnmounted(() => {
  cleanupStayTime?.();
});
</script>

<template>
  <NavHeader :group="group" />
  <RouterView />
</template>
