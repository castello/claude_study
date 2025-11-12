import { NextRequest, NextResponse } from "next/server";
import { createPost, getAllPosts } from "@/lib/data";

export async function GET() {
  const posts = getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, author, content } = body;

    if (!title || !author || !content) {
      return NextResponse.json(
        { error: "제목, 작성자, 내용은 필수입니다." },
        { status: 400 }
      );
    }

    const newPost = createPost({ title, author, content });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "게시글 작성에 실패했습니다." },
      { status: 500 }
    );
  }
}
