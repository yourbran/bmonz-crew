"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Next.js의 현재 경로 감지
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // 현재 경로 가져오기

  // 메뉴 바깥을 클릭하면 닫히도록 처리
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        event.target instanceof Element && // target이 존재하고 Element인지 확인
        !event.target.closest(`.${styles.navbar}`)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  // 페이지 이동 시 메뉴 자동 닫기
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className={styles.navbar}>
      <div
        className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* 메뉴 리스트 */}
      <div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <ul>
          <li>멤버소개</li>
          <li>이야기</li>
        </ul>
      </div>
    </nav>
  );
}
