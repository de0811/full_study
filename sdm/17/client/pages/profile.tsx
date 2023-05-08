import AppLayout from "@/components/AppLayout";
import userInptut from "@/hook/userInptut";
import { RootState } from "@/modules";
import { useSelector } from "react-redux";

const Signup = () => {
  const email = useSelector((state: RootState) => state?.myInfo.email);
  const password = useSelector((state: RootState) => state.myInfo.password);
  const name = useSelector((state: RootState) => state.myInfo.name);
  const snsId = useSelector((state: RootState) => state.myInfo.snsId);
  return (
    <AppLayout>
      <div className="row">ID : {email ? email : snsId}</div>
      <div className="row">PASSWORD : {password}</div>
      <div className="row">NAME : {name}</div>
    </AppLayout>
  );
};

export default Signup;
