import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">게시판 앱</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-4">환영합니다!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Next.js로 만든 게시판 애플리케이션입니다.
            </p>

            <div className="space-y-4">
              <Link
                href="/board"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
              >
                게시판 보기
              </Link>

              <div className="text-sm text-gray-500 dark:text-gray-400 mt-8">
                <h3 className="font-semibold mb-2">기능:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>게시글 목록 조회</li>
                  <li>게시글 작성</li>
                  <li>게시글 상세 보기</li>
                  <li>게시글 수정 및 삭제</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-900 p-4 text-center text-gray-600 dark:text-gray-400">
        <p>© 2024 게시판 앱. Made with Next.js</p>
      </footer>
    </div>
  );
}
