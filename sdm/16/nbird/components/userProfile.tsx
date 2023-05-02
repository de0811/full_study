//user profile page

import Head from "next/head";

const UserProfile = () => {
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <div>
        <div>내 프로필</div>
        <div>이름</div>
        <div>이메일</div>
      </div>
      <div>
        <button>로그아웃</button>
      </div>
    </>
  );
};

export default UserProfile;