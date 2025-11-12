import { NextRequest, NextResponse } from "next/server";
import { getPostById, updatePost, deletePost } from "@/lib/data";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const postId = parseInt(id);

  if (isNaN(postId)) {
    return NextResponse.json({ error: "유효하지 않은 ID입니다." }, { status: 400 });
  }

  const post = getPostById(postId);

  if (!post) {
    return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "유효하지 않은 ID입니다." }, { status: 400 });
    }

    const body = await request.json();
    const { title, author, content } = body;

    const updatedPost = updatePost(postId, { title, author, content });

    if (!updatedPost) {
      return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "게시글 수정에 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "유효하지 않은 ID입니다." }, { status: 400 });
    }

    const success = deletePost(postId);

    if (!success) {
      return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json({ message: "게시글이 삭제되었습니다." });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "게시글 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}
