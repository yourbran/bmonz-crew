import { Inter } from "next/font/google";
import Header from '@/components/Header';
import TransitionWrapper from "@/components/TransitionWrapper";
import "./globals.css";

const defaultFont = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={defaultFont.className}>
        <Header />
        <TransitionWrapper>
          {children}
        </TransitionWrapper>
      </body>
    </html>
  );
}
