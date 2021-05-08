import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Layout from 'components/layout';

import { store } from 'store';
import './global.css';

const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Google Keep';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{appName}</title>
      </Head>
      <main>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </main>
    </>
  );
}
