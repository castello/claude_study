"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CommentFormProps {
  postId: number;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const router = useRouter();
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, author, content }),
      });

      if (response.ok) {
        setAuthor("");
        setContent("");
        router.refresh();
      } else {
        alert("댓글 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">댓글 작성</h3>

      <div className="mb-4">
        <label htmlFor="comment-author" className="block text-sm font-medium mb-2">
          작성자
        </label>
        <input
          type="text"
          id="comment-author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700"
          placeholder="이름을 입력하세요"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="comment-content" className="block text-sm font-medium mb-2">
          내용
        </label>
        <textarea
          id="comment-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700"
          placeholder="댓글을 입력하세요"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        {isSubmitting ? "작성 중..." : "댓글 작성"}
      </button>
    </form>
  );
}
