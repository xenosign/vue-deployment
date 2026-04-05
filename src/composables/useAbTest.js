import { supabase } from '@/supabase';

const testName = 'main_test_v1';

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

export const logEvent = async (eventType, group) => {
  const userId = getDeviceId();
  const { error } = await supabase.from('ab_test_logs').insert([
    {
      test_name: testName,
      group,
      event_type: eventType,
      user_id: userId,
    },
  ]);
  if (error) console.error('Error logging to Supabase:', error);
};

export const setupStayTimeLog = (group) => {
  const userId = getDeviceId();
  const entryTime = Date.now();

  window.addEventListener(
    'pagehide',
    (event) => {
      if (event.persisted) return;
      const stayTime = Math.floor((Date.now() - entryTime) / 1000);
      if (stayTime < 1) return;

      fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/ab_test_logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          test_name: testName,
          group,
          event_type: 'stay_time',
          user_id: userId,
          data: { seconds: stayTime },
        }),
        keepalive: true,
      });
    },
    { once: true },
  );
};
