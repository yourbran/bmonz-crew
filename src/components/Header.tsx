"use client";

import Link from "next/link";
import Navbar from './Navbar';
import styles from '../styles/Header.module.css';

const Header = () => {
  

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoText}>
        볼더몬스터
      </Link>
      <div className={styles.navbarContainer}>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
