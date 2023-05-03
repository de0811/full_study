//user profile page

import Head from "next/head";
import { useCallback } from "react";

const UserProfile = ({
  id,
  name,
  password,
  setIsLogin,
}: {
  id: string;
  name: string;
  password: string;
  setIsLogin: (isLogin: boolean) => void;
}) => {
  const onLogout = useCallback((e: React.FormEvent<HTMLButtonElement>) => {
    //logout
    setIsLogin(false);
  }, []);
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <div>
        <div className="c-profile__id">
          <span>아이디</span>
          <span>{id}</span>
        </div>
        <div className="c-profile__password">
          <span>비밀번호</span>
          <span>{password}</span>
        </div>
        <div className="c-profile__name">
          <span>이름</span>
          <span>{name}</span>
        </div>
      </div>
      <div>
        <button onClick={onLogout}>로그아웃</button>
      </div>
    </>
  );
};

export default UserProfile;
