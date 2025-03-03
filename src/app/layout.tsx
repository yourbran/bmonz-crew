"use client";

import { Poppins } from "next/font/google";
import Header from '@/components/Header';
import { motion, AnimatePresence } from "framer-motion";
import "./globals.css";

const defaultFont = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={defaultFont.className}>
        <Header />
        <AnimatePresence mode="sync">
          <motion.div
            key={Math.random()} // 페이지가 변경될 때마다 애니메이션 실행
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </body>
    </html>
  );
}
