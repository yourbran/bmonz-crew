// src/app/crew/layout.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import usePageShow from '@/hooks/usePageShow';

export default function CrewRoutesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // 애니메이션 재생을 위한 state
  const [version, setVersion] = useState(0);

  // 뒤로가기, 앞으로 가기 시 애니메이션을 리셋
  const resetAnimation = useCallback(() => {
    setVersion((v) => v + 1);
  }, []);

  // bfcache 복원 시에도 애니메이션 재실행
  usePageShow(resetAnimation);

  // 스크롤 위치 저장/복원
  useEffect(() => {
    // 브라우저 자동 스크롤 복원 비활성화
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const key = `scroll-${pathname}`;
    // 뒤로/앞으로 가기 시 저장된 위치로 스크롤 이동
    const onPopstate = () => {
      const pos = sessionStorage.getItem(key);
      if (pos) {
        const [x, y] = JSON.parse(pos);
        window.scrollTo(x, y);
      }
    };
    window.addEventListener('popstate', onPopstate);

    return () => {
      window.removeEventListener('popstate', onPopstate);
      sessionStorage.setItem(
        key,
        JSON.stringify([window.scrollX, window.scrollY])
      );
    };
  }, [pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={`${pathname}-${version}`}   // 경로와 버전이 바뀌면 애니메이션 구동
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
