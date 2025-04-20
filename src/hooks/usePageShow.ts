// 모바일 환경에서 뒤로가기(bfcache) 시, 화면 깜빡임 증상 완화
import { useEffect } from 'react';

/**
 * bfcache에서 페이지가 복원될 때마다 콜백을 실행합니다.
 */
export default function usePageShow(callback: () => void) {
  useEffect(() => {
    function onPageShow(e: PageTransitionEvent) {
      if (e.persisted) {
        callback();
      }
    }
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, [callback]);
}
