## Vibe Coding Setup Summary

이 프로젝트는 **Vibe Architect** 환경으로 자동 설정되었습니다.

### 주요 설정 내역

1.  **프로젝트 생성**: Next.js (App Router), TypeScript, Tailwind CSS, ESLint
2.  **라이브러리 설치**:
    - UI/UX: `shadcn/ui`, `lucide-react`, `class-variance-authority`, `tailwind-merge`
    - Backend: `supabase-js`, `@supabase/ssr`
    - Font: `pretendard`
3.  **타이포그래피**: `Pretendard Variable` 폰트 적용 (`src/app/layout.tsx`)
4.  **AI 컨텍스트**: `.gemini/GEMINI.md` 생성 (Vibe Architect 페르소나 및 규약 설정)
5.  **문서화**: `docs/` 폴더 내 가이드라인 파일 생성
    - `coding-standards.md`
    - `react-guidlines.md`
    - `design-system.md`
6.  **AI 스킬 추가**: Web Interface Guidelines 검토를 위한 커스텀 스킬 설정 (`.gemini/skills/web-design-guidelines`)
7.  **Habit Tracker UI 개발**:
    - 모바일 앱 스타일의 기본 레이아웃 설계 (Header, Progress Card, Input, List, Bottom Nav)
    - Shadcn UI 컴포넌트 추가 (`button`, `input`, `card`, `checkbox`, `sheet`)
    - TypeScript 기반 데이터 구조 및 목 데이터 세팅
8.  **Habit Tracker CRUD 기능 구현**:
    - **Create**: 루틴 추가 (빈칸 시 경고창 표시)
    - **Update**: 인라인 수정 모드 (수정/취소 버튼, 미수정 시 원상복구)
    - **Delete**: 삭제 확인창 후 즉시 삭제
    - 스크롤 가능한 리스트 및 텍스트 줄바꿈 처리
