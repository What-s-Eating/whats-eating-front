import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=ca3dbc4079f589287989b06fe15da044&libraries=services,clusterer&autoload=false&libraries=services"
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  );
}
