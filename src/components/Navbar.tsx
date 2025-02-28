"use client";

import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/crew"> 크루원 소개 </Link>
        </li>
        <li>
          <Link href="/blog"> 블로그 </Link>
        </li>
        {/* 추가적인 메뉴 항목을 여기에 추가 */}
      </ul>
    </nav>
  );
};

export default Navbar;
