// src/app/crew/layout.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState, useCallback } from 'react';
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

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={`${pathname}-${version}`}   // 경로가 같더라도 version이 바뀌면 애니메이션 구동
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
