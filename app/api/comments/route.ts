import { NextRequest, NextResponse } from "next/server";
import { createComment, getCommentsByPostId } from "@/lib/data";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { error: "postId가 필요합니다." },
        { status: 400 }
      );
    }

    const comments = getCommentsByPostId(parseInt(postId));
    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "댓글을 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, author, content } = body;

    if (!postId || !author || !content) {
      return NextResponse.json(
        { error: "postId, 작성자, 내용은 필수입니다." },
        { status: 400 }
      );
    }

    const newComment = createComment({ postId, author, content });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "댓글 작성에 실패했습니다." },
      { status: 500 }
    );
  }
}
