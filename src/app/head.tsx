// src/app/head.tsx
export default function Head() {
    return (
      <>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function applyStylesheets() {
                  document
                    .querySelectorAll('link[rel="preload"][as="style"]')
                    .forEach(link => {
                      // 프리로드가 완료되면 스타일시트로 전환
                      link.addEventListener('load', () => { link.rel = 'stylesheet'; });
                      // 이미 캐시되어 있으면 즉시 전환
                      if (link.sheet) link.rel = 'stylesheet';
                    });
                }
                // 문서 로딩이 이미 끝났으면 바로 실행, 아니면 load 이벤트에 등록
                if (document.readyState === 'complete') {
                  applyStylesheets();
                } else {
                  window.addEventListener('load', applyStylesheets);
                }
              })();
            `,
          }}
        />
      </>
    );
  }