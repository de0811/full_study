import makeStore from "@/redux/configStore";
import wrapper from "@/redux/configStore";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Provider } from "react-redux";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={makeStore()}>
      <Head>
        <title>test going</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

// export default wrapper.withRedux(App);
export default App;
