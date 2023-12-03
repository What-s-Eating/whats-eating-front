import Header from "@/components/Layouts/Header";
import type { AppProps } from "next/app";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { nanumGothic } from "@/utils/fonts";
import { SessionProvider } from "next-auth/react";

import "swiper/css";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

const HeaderExcludePaths = ["/auth/login", "/auth/register"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <SessionProvider>
      <main className={nanumGothic.className}>
        {!HeaderExcludePaths.includes(router.pathname) && <Header />}
        <Component {...pageProps} />
      </main>
      <ToastContainer limit={3} position="bottom-center" />
    </SessionProvider>
  );
}
