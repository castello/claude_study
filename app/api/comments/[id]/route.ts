import { NextRequest, NextResponse } from "next/server";
import { deleteComment } from "@/lib/data";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const commentId = parseInt(id);

    const success = deleteComment(commentId);

    if (!success) {
      return NextResponse.json(
        { error: "댓글을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "댓글이 삭제되었습니다." });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { error: "댓글 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}
