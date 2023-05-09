import AppLayout from "@/components/AppLayout";
import userInptut from "@/hook/userInptut";
import { RootState } from "@/redux/reducer";
import { useSelector } from "react-redux";

interface Props {
  email: string;
  snsId: string;
  password: string;
  name: string;
}

const Profile = (props: Props) => {
  return (
    <>
      <div className="row">ID : {props.email ? props.email : props.snsId}</div>
      <div className="row">PASSWORD : {props.password}</div>
      <div className="row">NAME : {props.name}</div>
    </>
  );
};

export default Profile;
