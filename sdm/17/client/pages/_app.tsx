import makeStore from "@/redux/configStore";
import wrapper from "@/redux/configStore";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={makeStore()}>
      <Component {...pageProps} />
    </Provider>
  );
}

// export default wrapper.withRedux(App);
export default App;
