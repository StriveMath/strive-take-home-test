import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Strive Editor</title>
        <meta name="description" content="Strive Lessons" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
