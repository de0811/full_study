/*
 * 공통으로 들어갈 내용을 여기에 작성
 */

import LoginForm from "@/components/loginForm";
import UserProfile from "@/components/userProfile";
import Head from "next/head";
import { useState } from "react";

type AppProps = {
  Component: any;
  pageProps: any;
};

//로그인 상태 저장

const CommonComponent = ({ Component, pageProps }: AppProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Head>
        <title>NextBird</title>
      </Head>
      <Component {...pageProps} />

      {isLoggedIn ? (
        <div>로그인 했습니다.</div>
      ) : (
        <div>로그인 되지 않았습니다.</div>
      )}
      {isLoggedIn ? <UserProfile></UserProfile> : <LoginForm></LoginForm>}
    </>
  );
};

export default CommonComponent;
