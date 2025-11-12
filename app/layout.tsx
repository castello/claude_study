import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "게시판 앱",
  description: "Next.js로 만든 게시판 애플리케이션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
