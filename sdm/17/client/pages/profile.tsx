import AppLayout from "@/components/AppLayout";
import userInptut from "@/hook/userInptut";
import { RootState } from "@/modules";
import { useSelector } from "react-redux";

const Signup = () => {
  const myInfo = useSelector((state: RootState) => state.myInfo);
  const email = myInfo?.email
  const password = myInfo?.password;
  const name = myInfo?.name;
  const snsId = myInfo?.snsId;
  return (
    <AppLayout>
      <div className="row">ID : {email ? email : snsId}</div>
      <div className="row">PASSWORD : {password}</div>
      <div className="row">NAME : {name}</div>
    </AppLayout>
  );
};

export default Signup;
