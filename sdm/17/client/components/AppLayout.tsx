import React from "react";
import Link from "next/link";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>공통메뉴</div>
      <Link href={"/"}> 홈 </Link>
      <Link href={"/profile"}> 프로필 </Link>
      <Link href={"/signup"}> 회원가입 </Link>
      <div>{children}</div>
    </div>
  );
};

export default AppLayout;
