export interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  createdAt: string;
  views: number;
}

export interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  createdAt: string;
}
