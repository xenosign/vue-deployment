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
  // exposure는 세션당 한 번만 기록
  if (eventType === 'exposure') {
    const key = `ab_exposure_logged_${testName}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');
  }

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

const ENTRY_TIME_KEY = `ab_stay_entry_${testName}`;

export const clearStayTimeEntry = () => {
  sessionStorage.removeItem(ENTRY_TIME_KEY);
  sessionStorage.removeItem(`ab_exposure_logged_${testName}`);
};

export const setupStayTimeLog = (group) => {
  const userId = getDeviceId();

  // 타입 변경 페이지에서 돌아온 경우 기존 entryTime 재사용, 아니면 새로 기록
  let entryTime = sessionStorage.getItem(ENTRY_TIME_KEY);
  if (!entryTime) {
    entryTime = Date.now();
    sessionStorage.setItem(ENTRY_TIME_KEY, String(entryTime));
  } else {
    entryTime = parseInt(entryTime, 10);
  }

  const handler = (event) => {
    if (event.persisted) return;
    const stayTime = Math.floor((Date.now() - entryTime) / 1000);
    sessionStorage.removeItem(ENTRY_TIME_KEY);
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
  };

  window.addEventListener('pagehide', handler, { once: true });

  // 언마운트 시 리스너 제거용 cleanup 반환
  return () => {
    window.removeEventListener('pagehide', handler);
  };
};
