"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteButtonProps {
  postId: number;
}

export default function DeleteButton({ postId }: DeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("정말 이 게시글을 삭제하시겠습니까?")) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/board");
        router.refresh();
      } else {
        alert("게시글 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
    >
      {isDeleting ? "삭제 중..." : "삭제"}
    </button>
  );
}
