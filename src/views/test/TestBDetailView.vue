<template>
  <div class="page-container">
    <div class="detail-card">
      <span class="badge-label">버전 B — 상세</span>
      <h2>상세 페이지</h2>
      <p class="desc">B 타입의 상세 페이지입니다. 라우터 네비게이션 테스트용 페이지입니다.</p>
      <ul class="info-list">
        <li>항목 1: 라우터 페이지뷰 GA 추적 확인</li>
        <li>항목 2: 메인 → 상세 이동 경로 기록</li>
        <li>항목 3: 체류 시간 측정 (페이지 이탈 시 전송)</li>
      </ul>
      <RouterLink to="/test/b" class="btn-back">← 메인으로</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
}

.detail-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.badge-label {
  background: #ffe4e8;
  color: #be123c;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 99px;
  align-self: flex-start;
}

h2 {
  font-size: 1.6rem;
  font-weight: 800;
  margin: 0;
}

.desc {
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
}

.info-list {
  padding-left: 1.2rem;
  color: #374151;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.btn-back {
  align-self: flex-start;
  padding: 0.6rem 1.4rem;
  background: #ffe4e8;
  color: #be123c;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.15s;
}

.btn-back:hover {
  background: #fecdd3;
}
</style>
