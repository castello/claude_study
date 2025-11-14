import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostById, incrementViews, getCommentsByPostId } from "@/lib/data";
import DeleteButton from "@/components/DeleteButton";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: PageProps) {
  const { id } = await params;
  const postId = parseInt(id);

  if (isNaN(postId)) {
    notFound();
  }

  const post = getPostById(postId);

  if (!post) {
    notFound();
  }

  incrementViews(postId);

  const comments = getCommentsByPostId(postId);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <Link href="/board" className="text-2xl font-bold hover:text-blue-100">
            게시판 앱
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
              <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <div className="space-x-4">
                  <span>작성자: {post.author}</span>
                  <span>조회수: {post.views}</span>
                </div>
                <span>{new Date(post.createdAt).toLocaleString("ko-KR")}</span>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none mb-8">
              <p className="whitespace-pre-wrap">{post.content}</p>
            </div>

            <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Link
                href="/board"
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
              >
                목록으로
              </Link>
              <DeleteButton postId={post.id} />
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
              <h2 className="text-2xl font-bold">
                댓글 <span className="text-blue-600">({comments.length})</span>
              </h2>
            </div>

            <CommentList comments={comments} />

            <CommentForm postId={post.id} />
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-900 p-4 text-center text-gray-600 dark:text-gray-400">
        <p>© 2024 게시판 앱. Made with Next.js</p>
      </footer>
    </div>
  );
}
