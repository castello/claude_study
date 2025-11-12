import { Post } from "./types";

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
