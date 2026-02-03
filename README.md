1. 프로젝트 개요

본 프로젝트는 프론트엔드 개발자 채용 과제로,
제공된 API 서버와 연동하여 회원 인증 및 게시판 기능을 구현한 SPA입니다.

React 기반으로 구현되었으며,
실제 서비스 환경을 고려해 인증 처리, 라우팅 보호, 상태 관리, 코드 구조화에 중점을 두었습니다.

⸻

2. 기술 스택

구분 사용 기술
Framework React (Vite)
Language JavaScript
Styling styled-components
State Zustand
Data Fetching TanStack React Query
Routing React Router DOM
Lint ESLint
HTTP Client Axios

⸻

3. 실행 방법

1️⃣ 프로젝트 클론

git clone <레포지토리 주소>
cd bixpayments

2️⃣ 패키지 설치

npm install

3️⃣ 개발 서버 실행

npm run dev

브라우저에서
👉 http://localhost:5173 접속

⸻

4. 주요 기능

✅ 회원가입 / 로그인
• 이메일(username), 이름, 비밀번호 기반 회원가입
• 비밀번호 유효성 검증 (문서 기준)
• JWT 기반 로그인
• Access / Refresh Token 관리 (Zustand)

✅ 라우팅 접근 제어
• 비로그인 상태
• /login, /signup만 접근 가능
• 로그인 상태
• 게시판 관련 페이지 접근 가능
• 인증되지 않은 접근은 자동으로 로그인 페이지로 리다이렉트

✅ 게시판 기능
• 게시글 목록 조회 (페이지네이션)
• 게시글 상세 조회
• 게시글 작성
• 게시글 수정
• 게시글 삭제

✅ UX 개선
• 로그인 상태에 따른 버튼 노출 제어
• 서버 validation 에러 메시지 사용자 친화적으로 표시
• API 에러 시 불필요한 콘솔 오류 방지

⸻

5. 프로젝트 구조

src/
├─ api/ # API 요청 모듈
├─ pages/ # 페이지 단위 컴포넌트
│ ├─ BoardList.jsx
│ ├─ BoardList.styles.js
│ ├─ BoardDetail.jsx
│ ├─ BoardDetail.styles.js
│ ├─ BoardCreate.jsx
│ ├─ BoardCreate.styles.js
│ ├─ BoardEdit.jsx
│ ├─ BoardEdit.styles.js
│ ├─ Login.jsx
│ ├─ Login.styles.js
│ ├─ Signup.jsx
│ └─ Signup.styles.js
├─ routes/ # 라우팅 및 인증 가드
├─ store/ # Zustand 상태 관리
└─ main.jsx

    •	페이지 로직과 스타일을 파일 단위로 분리
    •	유지보수성과 가독성을 고려한 구조 설계

⸻

6. 설계 및 구현 포인트

🔹 인증 처리
• Axios interceptor를 활용한 토큰 자동 주입
• 401 응답 시 Refresh Token을 통한 재발급 처리

🔹 상태 관리
• 전역 인증 상태는 Zustand로 관리
• 서버 상태는 React Query로 관리하여 캐싱 및 refetch 제어

⸻

1. 기타
   • 과제 요구사항 외에도 UX 및 구조 개선을 위해 일부 기능을 추가 구현하였습니다.
   • 제출된 코드는 실행 가능한 상태이며, 별도의 환경 설정 없이 바로 실행 가능합니다.

⸻

8. 마무리

과제 수행 과정에서 실제 서비스 개발을 가정하고 구현하였으며,
면접 시 코드 리뷰 및 설계 의도에 대해 상세히 설명드릴 수 있습니다.

감사합니다 🙇‍♂️

⸻
