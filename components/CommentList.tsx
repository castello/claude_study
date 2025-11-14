"use client";

import { Comment } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (commentId: number) => {
    if (!confirm("정말 이 댓글을 삭제하시겠습니까?")) {
      return;
    }

    setDeletingId(commentId);

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert("댓글 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("오류가 발생했습니다.");
    } finally {
      setDeletingId(null);
    }
  };

  if (comments.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        첫 댓글을 작성해보세요!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {comment.author}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                {new Date(comment.createdAt).toLocaleString("ko-KR")}
              </span>
            </div>
            <button
              onClick={() => handleDelete(comment.id)}
              disabled={deletingId === comment.id}
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm disabled:text-gray-400"
            >
              {deletingId === comment.id ? "삭제 중..." : "삭제"}
            </button>
          </div>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {comment.content}
          </p>
        </div>
      ))}
    </div>
  );
}
