import { AppProps } from 'next/dist/next-server/lib/router/router';
import ym from 'react-yandex-metrika';
import { YMInitializer } from 'react-yandex-metrika';
import Head from 'next/head';
import '../styles/globals.css';
import Router from 'next/router';

Router.events.on('routeChangeComplete', (url: string) => {
  if ( typeof window !== 'undefined') {
    ym('hit', url);
  }
});

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  return <>
    <Head>
      <title>MyTop - наш лучший топ</title>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link rel="preconnect" href="https://mc.yandex.ru" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet" />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
      <meta property="og:locale" content="ru_RU" />
    </Head>
    <YMInitializer 
      accounts={[987654321]}
      options={{ webvisor: true, defer: true }}
      version="2"
    />
    <Component {...pageProps} />
    </>;
}

export default MyApp;
