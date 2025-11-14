import { Post, Comment } from "./types";
import fs from "fs";
import path from "path";

// 데이터 파일 경로
const DATA_DIR = path.join(process.cwd(), "data");
const COMMENTS_FILE = path.join(DATA_DIR, "comments.json");

// 데이터 디렉토리 생성
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 임시 데이터 (실제로는 데이터베이스를 사용해야 합니다)
export let posts: Post[] = [
  {
    id: 1,
    title: "첫 번째 게시글입니다",
    author: "관리자",
    content: "Next.js 게시판 앱에 오신 것을 환영합니다! 이것은 샘플 게시글입니다.",
    createdAt: new Date("2024-01-15").toISOString(),
    views: 42,
  },
  {
    id: 2,
    title: "Next.js 사용법",
    author: "개발자",
    content: "Next.js는 React 기반의 풀스택 프레임워크입니다. App Router를 사용하면 더욱 강력한 기능을 활용할 수 있습니다.",
    createdAt: new Date("2024-01-16").toISOString(),
    views: 128,
  },
  {
    id: 3,
    title: "TypeScript와 함께하는 개발",
    author: "코더",
    content: "TypeScript를 사용하면 타입 안정성을 확보하고 더 나은 개발 경험을 얻을 수 있습니다.",
    createdAt: new Date("2024-01-17").toISOString(),
    views: 95,
  },
];

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getPostById(id: number): Post | undefined {
  return posts.find((post) => post.id === id);
}

export function createPost(post: Omit<Post, "id" | "createdAt" | "views">): Post {
  const newPost: Post = {
    ...post,
    id: Math.max(...posts.map(p => p.id), 0) + 1,
    createdAt: new Date().toISOString(),
    views: 0,
  };
  posts.push(newPost);
  return newPost;
}

export function updatePost(id: number, updates: Partial<Omit<Post, "id" | "createdAt" | "views">>): Post | undefined {
  const index = posts.findIndex(post => post.id === id);
  if (index === -1) return undefined;

  posts[index] = { ...posts[index], ...updates };
  return posts[index];
}

export function deletePost(id: number): boolean {
  const index = posts.findIndex(post => post.id === id);
  if (index === -1) return false;

  posts.splice(index, 1);
  return true;
}

export function incrementViews(id: number): void {
  const post = posts.find(p => p.id === id);
  if (post) {
    post.views += 1;
  }
}

// 댓글 JSON 파일에서 로드
function loadComments(): Comment[] {
  try {
    if (fs.existsSync(COMMENTS_FILE)) {
      const data = fs.readFileSync(COMMENTS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading comments:", error);
  }

  // 파일이 없거나 오류가 발생하면 기본 댓글 생성 및 저장
  const defaultComments: Comment[] = [
    {
      id: 1,
      postId: 1,
      author: "방문자1",
      content: "좋은 정보 감사합니다!",
      createdAt: new Date("2024-01-15T10:30:00").toISOString(),
    },
    {
      id: 2,
      postId: 1,
      author: "개발자",
      content: "Next.js는 정말 강력한 프레임워크네요.",
      createdAt: new Date("2024-01-15T14:20:00").toISOString(),
    },
    {
      id: 3,
      postId: 2,
      author: "학습자",
      content: "App Router를 사용하면 서버 컴포넌트를 쉽게 활용할 수 있어서 좋습니다.",
      createdAt: new Date("2024-01-16T09:15:00").toISOString(),
    },
  ];

  // 기본 댓글을 파일에 저장
  saveComments(defaultComments);
  return defaultComments;
}

// 댓글 JSON 파일에 저장
function saveComments(commentsData: Comment[]): void {
  try {
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify(commentsData, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving comments:", error);
  }
}

// 댓글 데이터
export let comments: Comment[] = loadComments();

export function getCommentsByPostId(postId: number): Comment[] {
  return comments
    .filter((comment) => comment.postId === postId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

export function createComment(comment: Omit<Comment, "id" | "createdAt">): Comment {
  const newComment: Comment = {
    ...comment,
    id: Math.max(...comments.map(c => c.id), 0) + 1,
    createdAt: new Date().toISOString(),
  };
  comments.push(newComment);
  saveComments(comments);
  return newComment;
}

export function deleteComment(id: number): boolean {
  const index = comments.findIndex(comment => comment.id === id);
  if (index === -1) return false;

  comments.splice(index, 1);
  saveComments(comments);
  return true;
}
