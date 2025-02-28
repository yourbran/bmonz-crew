"use client";

import { useState } from 'react';
import Image from 'next/image';
import Navbar from './Navbar';
import styles from '../styles/Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
      </div>
      <div className={styles.menuButton} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
      {isMenuOpen && <Navbar />}
    </header>
  );
};

export default Header;
