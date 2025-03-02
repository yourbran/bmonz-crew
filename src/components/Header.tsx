"use client";

import Image from 'next/image';
import Navbar from './Navbar';
import styles from '../styles/Header.module.css';

const Header = () => {
  

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
