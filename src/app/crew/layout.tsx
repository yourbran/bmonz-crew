'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function CrewRoutesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}                       // 경로가 바뀔 때만 언마운트/마운트
        initial={{ opacity: 0, x: 50 }}      // 진입 애니메이션
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}        // 퇴장 애니메이션 (뒤로가기 시)
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
