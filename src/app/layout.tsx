import { Inter } from "next/font/google";
import Header from '@/components/Header';
import TransitionWrapper from "@/components/TransitionWrapper";
import "./globals.css";
import headerStyles from "@/styles/Header.module.css";
import navbarStyles from "@/styles/Navbar.module.css";

const defaultFont = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={defaultFont.className}>
        <Header headerStyles={headerStyles} navbarStyles={navbarStyles} />
        <TransitionWrapper>
          {children}
        </TransitionWrapper>
      </body>
    </html>
  );
}
