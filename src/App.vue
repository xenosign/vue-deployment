<script setup>
import { ref, onMounted, shallowRef } from 'vue';
import { supabase } from '@/supabase';
import TestA from './components/TestA.vue';
import TestB from './components/TestB.vue';

const testName = 'main_test_v1';
const currentGroup = ref('');
const activeComponent = shallowRef(null);
const userId = ref('');
let entryTime = Date.now();

const getDeviceId = () => {
  let id = localStorage.getItem('ab_test_user_id');
  if (!id) {
    id = window.crypto?.randomUUID
      ? crypto.randomUUID()
      : `guest_${Math.random().toString(36).slice(2, 11)}`;
    localStorage.setItem('ab_test_user_id', id);
  }
  return id;
};

const logEvent = async (eventType) => {
  const { error } = await supabase.from('ab_test_logs').insert([
    {
      test_name: testName,
      group: currentGroup.value,
      event_type: eventType,
      user_id: userId.value,
    },
  ]);
  if (error) console.error('Error logging to Supabase:', error);
};

const handleChildClick = () => logEvent('click');

onMounted(() => {
  userId.value = getDeviceId();

  let group = localStorage.getItem(`ab_test_${testName}`);
  if (!group) {
    group = Math.random() < 0.5 ? 'A' : 'B';
    localStorage.setItem(`ab_test_${testName}`, group);
  }

  currentGroup.value = group;
  activeComponent.value = group === 'A' ? TestA : TestB;

  logEvent('exposure');
  entryTime = Date.now();

  window.addEventListener('pagehide', (event) => {
    if (event.persisted) return;

    const stayTime = Math.floor((Date.now() - entryTime) / 1000);
    if (stayTime < 1) return;

    const payload = {
      test_name: testName,
      group: currentGroup.value,
      event_type: 'stay_time',
      user_id: userId.value,
      data: { seconds: stayTime },
    };

    fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/ab_test_logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});
</script>

<template>
  <main>
    <component :is="activeComponent" @cta-click="handleChildClick" />
  </main>
</template>
