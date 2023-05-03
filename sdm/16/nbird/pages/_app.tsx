/*
 * 공통으로 들어갈 내용을 여기에 작성
 */

import LoginForm from "@/components/LoginForm";
import UserProfile from "@/components/UserProfile";
import Head from "next/head";
import { useState } from "react";
import wrapper from "../store/configStore";

type AppProps = {
  Component: any;
  pageProps: any;
};

//로그인 상태 저장

const CommonComponent = ({ Component, pageProps }: AppProps) => {
  console.log(Component, pageProps);
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <Head>
        <title>NextBird</title>
      </Head>
      <Component {...pageProps} />

      {isLogin ? (
        <div>로그인 했습니다.</div>
      ) : (
        <div>로그인 되지 않았습니다.</div>
      )}
      {isLogin ? <UserProfile setIsLogin={setIsLogin} id="asd" password="asd" name="asd"></UserProfile> : <LoginForm setIsLogin={setIsLogin}></LoginForm>}
    </>
  );
};

export default wrapper.withRedux(CommonComponent);
