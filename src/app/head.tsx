// src/app/head.tsx
export default function Head() {
    return (
      <>
        {/* 기존에 Next.js가 자동으로 삽입하는 preload 스타일 링크들을 가로채서 */}
        {/* onload 이벤트로 rel="stylesheet"로 전환해 줍니다. */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
              // DOMContentLoaded 이전에 이미 로드된 링크가 있을 수 있으니 즉시 실행
              (function() {
                const links = document.querySelectorAll('link[rel="preload"][as="style"]');
                links.forEach(link => {
                  // onload 시 stylesheet로 바꾸기
                  link.onload = () => { link.rel = 'stylesheet'; };
                  // 만약 이미 로드가 끝난 상태라면 즉시 전환
                  if (link.sheet) {
                    link.rel = 'stylesheet';
                  }
                });
              })();
            `,
          }}
        />
      </>
    );
  }
  