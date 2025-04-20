export default function Head() {
    return (
      <>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function applyStylesheets() {
                  document.querySelectorAll('link[rel="preload"][as="style"]').forEach(link => {
                    // load 완료 시 stylesheet 전환
                    link.addEventListener('load', () => { link.rel = 'stylesheet'; });
                    // 이미 캐시된 경우 즉시 전환
                    if (link.sheet) link.rel = 'stylesheet';
                  });
                }
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
  