import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/reducer";
import Login from "./login";
import Profile from "./profile";
import { logout } from "@/redux/reducer/myInfo";
import Nav from "./nav";

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
      <Nav/>

      <div>{children}</div>
      <div>
        {!isLogin ? (
          <Login/>
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
