"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type NavbarProps = {
  styles: Record<string, string>;
};

export default function Navbar({ styles }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // 메뉴 바깥을 클릭하면 닫히도록 처리
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        event.target instanceof Element &&
        !event.target.closest(`.${styles.navbar}`)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, styles.navbar]); // styles.navbar 추가로 의존성 경고 제거

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

      {/* 드롭다운 메뉴 */}
      <div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>  
        <ul>
          <li>
            <Link href="/crew" className={styles.menuLink} prefetch={false}>
              멤버소개
            </Link>
          </li>
          <li>
            <Link href="/training" className={styles.menuLink} prefetch={false}>
              훈련
            </Link>
          </li>
          <li>
            <Link href="/story" className={styles.menuLink} prefetch={false}>
              이야기
            </Link>
          </li>
          {/* 닫기 버튼 */}
          <li className={styles.menuLink} onClick={() => setIsOpen(false)}>
            닫기
          </li>
        </ul>
      </div>
    </nav>
  );
}
