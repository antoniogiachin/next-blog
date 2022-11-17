import { Layout } from "../components/layout/layout";
import "../styles/globals.css";
import Head from "next/head";

// REDUX STORE
import { store } from "../store/store";
import { Provider } from "react-redux";

// NEXT AUTH
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <Head>
            <title>The Tony Blog!</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <meta charSet="utf-8" />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
