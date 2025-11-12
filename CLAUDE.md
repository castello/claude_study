# CLAUDE.md - 프로젝트 개발 가이드

이 문서는 AI 어시스턴트(Claude)가 이 프로젝트를 이해하고 작업할 때 참고하는 문서입니다.

## 프로젝트 개요

**프로젝트명**: Board App (게시판 앱)
**버전**: 0.1.0
**설명**: Next.js 16과 TypeScript로 구현된 기본 게시판 애플리케이션

## 기술 스택

### 핵심 프레임워크
- **Next.js 16.0.1** - React 기반 풀스택 프레임워크 (App Router 사용)
- **React 19.2.0** - UI 라이브러리
- **TypeScript 5.9.3** - 타입 안정성

### 스타일링
- **Tailwind CSS 4.1.17** - 유틸리티 기반 CSS 프레임워크
- **@tailwindcss/postcss 4.1.17** - Tailwind v4용 PostCSS 플러그인
- **PostCSS 8.5.6** - CSS 전처리기
- **Autoprefixer 10.4.22** - CSS 벤더 프리픽스 자동 추가

### 개발 도구
- **ESLint 9.39.1** - 코드 린팅
- **eslint-config-next 16.0.1** - Next.js 전용 ESLint 설정

## 프로젝트 구조

```
/Users/seongnamkung/claude/
├── app/                        # Next.js App Router 디렉토리
│   ├── api/                   # API Routes
│   │   └── posts/            # 게시글 관련 API
│   │       ├── route.ts      # GET /api/posts, POST /api/posts
│   │       └── [id]/         # 동적 라우트
│   │           └── route.ts  # GET/PUT/DELETE /api/posts/:id
│   ├── board/                # 게시판 페이지
│   │   ├── page.tsx         # 게시글 목록 페이지
│   │   ├── new/             # 글쓰기 페이지
│   │   │   └── page.tsx
│   │   └── [id]/            # 게시글 상세 페이지 (동적 라우트)
│   │       └── page.tsx
│   ├── layout.tsx           # 루트 레이아웃 (메타데이터 포함)
│   ├── page.tsx             # 홈페이지
│   └── globals.css          # 전역 스타일 (Tailwind 포함)
├── components/              # 재사용 가능한 React 컴포넌트
│   └── DeleteButton.tsx     # 게시글 삭제 버튼 (Client Component)
├── lib/                     # 유틸리티 및 데이터 레이어
│   ├── types.ts            # TypeScript 타입 정의
│   └── data.ts             # 임시 데이터 저장소 및 CRUD 함수
├── public/                  # 정적 파일
├── .eslintrc.json          # ESLint 설정
├── .gitignore              # Git 무시 파일
├── next.config.ts          # Next.js 설정
├── postcss.config.js       # PostCSS 설정 (Tailwind v4)
├── tsconfig.json           # TypeScript 설정
├── package.json            # 프로젝트 메타데이터 및 의존성
└── README.md               # 사용자용 문서
```

## 아키텍처 패턴

### 1. Next.js App Router
- 파일 시스템 기반 라우팅
- Server Components를 기본으로 사용
- Client Components는 `"use client"` 지시어로 명시

### 2. 데이터 흐름
```
[Client] → [API Route] → [Data Layer (lib/data.ts)] → [In-Memory Storage]
```

현재는 메모리 내 배열(`posts`)에 데이터를 저장합니다. 서버 재시작 시 데이터가 초기화됩니다.

### 3. 컴포넌트 분류
- **Server Components**: `app/page.tsx`, `app/board/page.tsx`, `app/board/[id]/page.tsx`
- **Client Components**: `app/board/new/page.tsx`, `components/DeleteButton.tsx`

## 데이터 모델

### Post 인터페이스 (`lib/types.ts`)
```typescript
interface Post {
  id: number;          // 고유 식별자 (자동 생성)
  title: string;       // 게시글 제목
  author: string;      // 작성자 이름
  content: string;     // 게시글 내용
  createdAt: string;   // 작성일시 (ISO 8601 형식)
  views: number;       // 조회수
}
```

## API 엔드포인트

### 게시글 관련 API (`app/api/posts/`)

#### 1. 게시글 목록 조회
- **Endpoint**: `GET /api/posts`
- **Response**: `Post[]` (최신순 정렬)

#### 2. 게시글 작성
- **Endpoint**: `POST /api/posts`
- **Request Body**: `{ title: string, author: string, content: string }`
- **Response**: `Post` (생성된 게시글)
- **Validation**: title, author, content는 필수

#### 3. 게시글 단일 조회
- **Endpoint**: `GET /api/posts/:id`
- **Response**: `Post`
- **Error**: 404 if not found

#### 4. 게시글 수정
- **Endpoint**: `PUT /api/posts/:id`
- **Request Body**: `{ title?: string, author?: string, content?: string }`
- **Response**: `Post` (수정된 게시글)

#### 5. 게시글 삭제
- **Endpoint**: `DELETE /api/posts/:id`
- **Response**: `{ message: string }`
- **Error**: 404 if not found

## 주요 기능

### 1. 게시글 목록 (`/board`)
- 모든 게시글을 테이블 형식으로 표시
- 최신순 정렬
- 번호, 제목, 작성자, 작성일, 조회수 표시
- 제목 클릭 시 상세 페이지로 이동

### 2. 게시글 작성 (`/board/new`)
- Client Component (폼 상태 관리)
- 제목, 작성자, 내용 입력
- 작성 완료 시 `/board`로 리다이렉트

### 3. 게시글 상세 보기 (`/board/[id]`)
- Server Component
- 게시글 전체 내용 표시
- 페이지 로드 시 조회수 자동 증가
- 삭제 버튼 제공

### 4. 게시글 삭제
- Client Component (`DeleteButton`)
- 삭제 확인 다이얼로그
- 삭제 후 목록으로 리다이렉트

## 스타일링 가이드

### Tailwind CSS v4 사용법
- `@import "tailwindcss"` 방식 사용 (v4 변경사항)
- 설정 파일 없이 CSS에서 직접 설정 가능
- 유틸리티 클래스 우선 사용

### 주요 디자인 패턴
- **색상 팔레트**:
  - Primary: `bg-blue-600`, `hover:bg-blue-700`
  - Secondary: `bg-gray-500`, `bg-gray-600`
  - Danger: `bg-red-600`, `hover:bg-red-700`
- **레이아웃**: 컨테이너 중앙 정렬 (`container mx-auto`)
- **반응형**: 모바일 퍼스트 디자인
- **다크모드**: CSS 변수와 `prefers-color-scheme` 사용

## 개발 워크플로우

### 1. 개발 서버 실행
```bash
npm run dev
```
- 기본 포트: 3000 (사용 중이면 다른 포트 자동 선택)
- Hot Module Replacement (HMR) 지원

### 2. 빌드
```bash
npm run build
```
- 프로덕션 최적화 빌드
- TypeScript 타입 체크
- ESLint 검사

### 3. 프로덕션 서버
```bash
npm start
```
- 빌드된 애플리케이션 실행

### 4. 린팅
```bash
npm run lint
```

## 알려진 제약사항 및 개선 필요 사항

### 1. 데이터 영속성
- **현재**: 메모리 내 배열 사용 (서버 재시작 시 데이터 손실)
- **개선 필요**: 데이터베이스 연결 (PostgreSQL, MongoDB 등)
- **권장**: Prisma ORM + PostgreSQL 또는 Supabase

### 2. 인증/인가
- **현재**: 인증 시스템 없음 (누구나 CRUD 가능)
- **개선 필요**: 사용자 인증 및 권한 관리
- **권장**: NextAuth.js 또는 Clerk

### 3. 게시글 수정 기능
- **현재**: API는 존재하나 UI 미구현
- **개선 필요**: 수정 페이지 및 폼 구현

### 4. 페이지네이션
- **현재**: 모든 게시글을 한 번에 표시
- **개선 필요**: 페이지네이션 또는 무한 스크롤

### 5. 검색 기능
- **현재**: 검색 기능 없음
- **개선 필요**: 제목/내용 검색

### 6. 이미지 업로드
- **현재**: 텍스트만 지원
- **개선 필요**: 이미지/파일 첨부 기능

### 7. 댓글 시스템
- **현재**: 댓글 기능 없음
- **개선 필요**: 게시글별 댓글 기능

### 8. 마크다운 지원
- **현재**: 일반 텍스트만 지원
- **개선 필요**: 마크다운 에디터 및 렌더러

## TypeScript 타입 안정성

### 엄격 모드 사용
`tsconfig.json`에서 `"strict": true` 설정으로 최대 타입 안정성 확보

### 주요 타입
- `Post`: 게시글 데이터 모델
- `PageProps`: Next.js 페이지 props (params, searchParams)
- `RouteContext`: API Route의 context 타입

## Next.js 특화 사항

### 1. Dynamic Routes
- `[id]` 폴더: 동적 라우트 파라미터
- `params`는 Promise로 래핑됨 (Next.js 15+)
- 예: `const { id } = await params;`

### 2. Server vs Client Components
- **Server Components**: 데이터 페칭, SEO 최적화
- **Client Components**: 상태 관리, 이벤트 핸들러, 브라우저 API 사용

### 3. Metadata
`app/layout.tsx`에서 메타데이터 설정:
```typescript
export const metadata: Metadata = {
  title: "게시판 앱",
  description: "Next.js로 만든 게시판 애플리케이션",
};
```

### 4. Router 사용
- `useRouter` (Client Component): 프로그래매틱 네비게이션
- `router.push()`: 페이지 이동
- `router.refresh()`: 서버 컴포넌트 리프레시

## 디버깅 및 문제 해결

### 1. 포트 충돌
- **증상**: "Port 3000 is in use"
- **해결**: 다른 포트 자동 선택 또는 기존 프로세스 종료

### 2. Tailwind CSS 적용 안 됨
- **확인 사항**:
  - `@import "tailwindcss"` 존재 여부
  - `postcss.config.js`에 `@tailwindcss/postcss` 설정
  - 패키지 설치: `@tailwindcss/postcss`

### 3. TypeScript 오류
- **해결**: `npm run build`로 타입 체크
- `tsconfig.json`의 `jsx: "react-jsx"` 설정 확인

### 4. ESLint 경고
- **해결**: `npm run lint`로 문제 확인
- Next.js 권장 패턴 따르기

## 코딩 컨벤션

### 1. 파일 명명 규칙
- 컴포넌트: PascalCase (`DeleteButton.tsx`)
- 유틸리티: camelCase (`data.ts`, `types.ts`)
- Next.js 라우트: kebab-case 또는 [param] (`page.tsx`, `[id]/page.tsx`)

### 2. 컴포넌트 구조
```typescript
// 1. Imports
import { ... } from "...";

// 2. Types/Interfaces
interface Props { ... }

// 3. Component
export default function Component({ props }: Props) {
  // 4. State & Hooks
  const [state, setState] = useState();

  // 5. Handlers
  const handleClick = () => { ... };

  // 6. Render
  return (...);
}
```

### 3. API Route 구조
```typescript
// 1. Imports
import { NextRequest, NextResponse } from "next/server";

// 2. Handler
export async function GET(request: NextRequest) {
  try {
    // Logic
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
```

## 확장 로드맵

### Phase 1: 데이터베이스 연결
1. Prisma 설치 및 설정
2. PostgreSQL 또는 Supabase 연결
3. `lib/data.ts`를 데이터베이스 쿼리로 대체

### Phase 2: 인증 시스템
1. NextAuth.js 설정
2. 로그인/회원가입 페이지
3. 게시글 작성자 검증

### Phase 3: 고급 기능
1. 페이지네이션 구현
2. 검색 기능 추가
3. 게시글 수정 UI 구현
4. 댓글 시스템

### Phase 4: UX 개선
1. 로딩 상태 개선
2. 에러 바운더리
3. Toast 알림
4. 이미지 업로드

### Phase 5: 배포 및 최적화
1. Vercel 배포
2. 이미지 최적화
3. SEO 개선
4. 성능 모니터링

## AI 어시스턴트를 위한 작업 가이드

### 새로운 기능 추가 시
1. **타입 먼저**: `lib/types.ts`에 필요한 타입 정의
2. **데이터 레이어**: `lib/data.ts`에 CRUD 함수 추가
3. **API 라우트**: `app/api/`에 엔드포인트 생성
4. **UI 컴포넌트**: 필요에 따라 Server/Client Component 선택
5. **스타일링**: Tailwind 유틸리티 클래스 사용
6. **테스트**: 로컬에서 기능 검증 후 커밋

### 코드 수정 시 주의사항
- Server Component에서 `useState`, `useEffect` 사용 금지
- Client Component에는 `"use client"` 지시어 필수
- API Route에서는 항상 try-catch 사용
- TypeScript 타입 명시적으로 지정
- 기존 코딩 스타일 유지

### 디버깅 우선순위
1. TypeScript 타입 오류
2. ESLint 경고
3. 런타임 오류
4. UX/UI 개선

## 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [React 공식 문서](https://react.dev)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [TypeScript 문서](https://www.typescriptlang.org/docs)
- [Next.js App Router 가이드](https://nextjs.org/docs/app)

---

**마지막 업데이트**: 2025-11-12
**작성자**: Claude (AI Assistant)
**프로젝트 상태**: 초기 개발 완료, 확장 가능한 상태
