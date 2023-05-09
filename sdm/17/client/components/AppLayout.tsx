import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/reducer";
import Login from "./login";
import Profile from "./profile";
import { logout } from "@/redux/reducer/myInfo";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.myInfo.isLogin);
  const myInfo = useSelector((state: RootState) => {
    console.log("AppLayout Start ", state.myInfo);
    console.log("AppLayout Start ", state);
    return state.myInfo;
  });
  console.log(myInfo);
  return (
    <>
      <div className="nav">
        <div>공통메뉴</div>
        <Link href={"/"}> 홈 </Link>
        {/* <Link href={"/profile"}> 프로필 </Link> */}
        <Link href={"/signup"}> 회원가입 </Link>
        <div>{children}</div>
        {isLogin && <button onClick={() => dispatch(logout({}))} >로그아웃</button>}
      </div>
      <div>
        {!isLogin ? (
          <Login></Login>
        ) : (
          <Profile
            email={myInfo.email}
            snsId={myInfo.snsId}
            password={myInfo.password}
            name={myInfo.name}
          ></Profile>
        )}
        


      </div>
    </>
  );
};

export default AppLayout;
