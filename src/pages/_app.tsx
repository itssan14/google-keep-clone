import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Layout from 'components/layout';
import EditModal from 'components/editModal';

import { store } from 'store';
import 'styles/global.css';

const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Google Keep';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="https://ssl.gstatic.com/keep/keep_2020q4v2.ico"
        />
        <title>{appName}</title>
      </Head>
      <main>
        <Provider store={store}>
          <EditModal />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </main>
    </>
  );
}
