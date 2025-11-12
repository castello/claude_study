# 게시판 앱 (Board App)

Next.js로 만든 간단한 게시판 애플리케이션입니다.

## 기술 스택

- **Next.js 16** - React 기반 풀스택 프레임워크
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 유틸리티 기반 CSS 프레임워크
- **App Router** - Next.js의 최신 라우팅 시스템

## 주요 기능

- 게시글 목록 조회
- 게시글 작성
- 게시글 상세 보기
- 게시글 삭제
- 조회수 카운팅
- 반응형 디자인
- 다크 모드 지원

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 3. 빌드

```bash
npm run build
```

### 4. 프로덕션 서버 실행

```bash
npm start
```

## 프로젝트 구조

```
.
├── app/                    # Next.js App Router
│   ├── api/               # API 라우트
│   │   └── posts/         # 게시글 API
│   ├── board/             # 게시판 페이지
│   │   ├── [id]/          # 게시글 상세 페이지
│   │   ├── new/           # 글쓰기 페이지
│   │   └── page.tsx       # 게시판 목록
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈페이지
│   └── globals.css        # 전역 스타일
├── components/            # React 컴포넌트
│   └── DeleteButton.tsx   # 삭제 버튼 컴포넌트
├── lib/                   # 유틸리티 및 데이터
│   ├── data.ts           # 임시 데이터 저장소
│   └── types.ts          # TypeScript 타입 정의
└── public/               # 정적 파일
```

## Next.js 주요 개념

### App Router

Next.js 13+에서 도입된 새로운 라우팅 시스템입니다. `app` 디렉토리 내의 폴더 구조가 URL 경로가 됩니다.

- `app/page.tsx` → `/`
- `app/board/page.tsx` → `/board`
- `app/board/[id]/page.tsx` → `/board/1`, `/board/2` 등

### Server Components vs Client Components

- **Server Components** (기본값): 서버에서 렌더링되며 JavaScript가 클라이언트로 전송되지 않습니다.
- **Client Components**: `"use client"` 지시어를 사용하며, 상태 관리와 이벤트 핸들러를 사용할 수 있습니다.

### API Routes

`app/api` 디렉토리에서 API 엔드포인트를 생성할 수 있습니다.

- `GET /api/posts` - 모든 게시글 조회
- `POST /api/posts` - 새 게시글 작성
- `GET /api/posts/[id]` - 특정 게시글 조회
- `PUT /api/posts/[id]` - 게시글 수정
- `DELETE /api/posts/[id]` - 게시글 삭제

## 데이터 관리

현재는 메모리 내 임시 데이터(`lib/data.ts`)를 사용합니다. 실제 프로덕션 환경에서는 다음과 같은 데이터베이스를 사용하는 것을 권장합니다:

- PostgreSQL (with Prisma)
- MongoDB (with Mongoose)
- Supabase
- Firebase

## 스타일링

Tailwind CSS를 사용하여 스타일링합니다. 주요 클래스:

- `bg-blue-600` - 배경색
- `text-white` - 텍스트 색상
- `p-4` - 패딩
- `rounded-lg` - 모서리 둥글게
- `hover:bg-blue-700` - 호버 효과

## 다음 단계

이 프로젝트를 확장하려면:

1. **데이터베이스 연결**: Prisma + PostgreSQL 추가
2. **인증**: NextAuth.js로 사용자 인증 구현
3. **검색 기능**: 게시글 검색 추가
4. **페이지네이션**: 게시글 목록 페이징
5. **댓글 기능**: 게시글에 댓글 추가
6. **이미지 업로드**: 게시글에 이미지 첨부
7. **마크다운 지원**: 게시글 작성 시 마크다운 편집기

## 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [React 공식 문서](https://react.dev)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [TypeScript 문서](https://www.typescriptlang.org/docs)

## 라이선스

MIT
