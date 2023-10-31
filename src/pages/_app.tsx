import Header from "@/components/Layouts/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Nanum_Gothic } from "next/font/google";
import { useRouter } from "next/router";

const NanumGothic = Nanum_Gothic({
  weight: ["400", "700", "800"],
  preload: false,
  subsets: ["latin"],
});

const HeaderExcludePaths = ["/auth/login", "/auth/register"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <main className={NanumGothic.className}>
      {!HeaderExcludePaths.includes(router.pathname) && <Header />}
      <Component {...pageProps} />
    </main>
  );
}
