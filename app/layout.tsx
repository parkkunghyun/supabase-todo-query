import type { Metadata } from "next";
import { Outfit, Ovo } from "next/font/google";
import "./globals.css";
import ReactQueryClientProvider from './config/ReactQueryClientProvider';

const outfit = Outfit({
  subsets: ["latin"], weight: ["400", "500", "600", "700"]
});

const ovo = Ovo({
  subsets: ["latin"], weight: ["400"]
});

export const metadata: Metadata = {
  title: "todo-query",
  description: "supabase로 데이터를 CRUD하고 Reactquery로 서버 데이터 상태를 관리하는 TODO 프로젝트입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en">
      <head>
        <link rel="icon" href="/todo-logo.png" type="image/png" />
      </head>
      <body
        className={`${outfit.className} ${ovo.className} `}
      >
        <ReactQueryClientProvider>
          {children}
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
