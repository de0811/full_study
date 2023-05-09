import { RootState } from "@/redux/reducer";
import { logout } from "@/redux/reducer/myInfo";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

export default function Nav () {
  const myInfo = useSelector((state: RootState) => state.myInfo);
  const dispatch = useDispatch();
  return (
    <div className="nav">
        <div>공통메뉴</div>
        <Link href={"/"}> 홈 </Link>
        <Link href={"/signup"}> 회원가입 </Link>
        {myInfo.isLogin && <button onClick={() => dispatch(logout({}))} >로그아웃</button>}
      </div>
  );
}
