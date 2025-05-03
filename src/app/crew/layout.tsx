'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState, useCallback, useEffect, useRef } from 'react';
import usePageShow from '@/hooks/usePageShow';

export default function CrewRoutesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [version, setVersion] = useState(0);
  const prevPathRef = useRef<string>(pathname);

  // 뒤로/앞으로 BFCache pop 시 애니메이션 리셋
  const resetAnimation = useCallback(() => {
    setVersion((v) => v + 1);
  }, []);
  usePageShow(resetAnimation);

  // 스크롤 복원: popstate 이벤트 사용
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const handlePopState = () => {
      const key = `scroll-${window.location.pathname}`;
      const pos = sessionStorage.getItem(key);
      if (pos) {
        const [x, y] = JSON.parse(pos);
        window.scrollTo(x, y);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // 경로 변경 시 이전 페이지의 스크롤 위치 저장
  useEffect(() => {
    const prevKey = `scroll-${prevPathRef.current}`;
    sessionStorage.setItem(prevKey, JSON.stringify([window.scrollX, window.scrollY]));
    prevPathRef.current = pathname;
  }, [pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={`${pathname}-${version}`}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}