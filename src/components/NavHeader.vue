<template>
  <nav class="nav-header">
    <div class="nav-inner">
      <span class="nav-brand">AB Test <span :class="`badge badge-${group.toLowerCase()}`">{{ group }} 그룹</span></span>
      <ul class="nav-links">
        <li><RouterLink to="/">홈</RouterLink></li>
        <li><RouterLink :to="`/test/${group.toLowerCase()}`">메인</RouterLink></li>
        <li><RouterLink :to="`/test/${group.toLowerCase()}/detail`">상세</RouterLink></li>
        <li><RouterLink to="/change-type" class="link-change">타입 변경</RouterLink></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  group: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.nav-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.nav-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-brand {
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.badge {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 99px;
  color: #fff;
}

.badge-a {
  background: #4f8ef7;
}

.badge-b {
  background: #f74f6d;
}

.nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  text-decoration: none;
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 4px 0;
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;
}

.nav-links a:hover {
  color: #111;
}

.nav-links a.router-link-active {
  color: #111;
  border-bottom-color: #111;
}

.link-change {
  color: #7c3aed !important;
}

.link-change:hover {
  color: #5b21b6 !important;
}

.link-change.router-link-active {
  border-bottom-color: #7c3aed !important;
}
</style>
