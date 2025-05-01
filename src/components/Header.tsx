"use client";

import Link from "next/link";
import Navbar from './Navbar';

type HeaderProps = {
  headerStyles: Record<string, string>;
  navbarStyles: Record<string, string>;
};

export default function Header({ headerStyles, navbarStyles, }: HeaderProps) {
  return (
    <header className={headerStyles.header}>
      <Link href="/" className={headerStyles.logoText} prefetch={false}>볼더몬스터</Link>
      <div className={headerStyles.navbarContainer}>
        <Navbar styles={navbarStyles} />
      </div>
    </header>
  );
};