import Header from "@/components/Layouts/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Nanum_Gothic } from "next/font/google";

const NanumGothic = Nanum_Gothic({
  weight: ["400", "700", "800"],
  preload: false,
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={NanumGothic.className}>
      <Header />
      <Component {...pageProps} />
    </main>
  );
}
