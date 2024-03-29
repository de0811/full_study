import AppLayout from "@/components/AppLayout";
import userInptut from "@/hook/userInptut";
import { addUser } from "@/redux/reducer/users";
import { useCallback } from "react";
import signupStyles from "@/styles/signup.module.css";
import { useDispatch } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();
  const [id, setId] = userInptut("");
  const [password, setPassword] = userInptut("");
  const [name, setName] = userInptut("");
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!id || !password || !name) {
        alert("빈칸을 채워주세요");
        return;
      }

      dispatch(
        addUser({
          id,
          password,
          name,
        })
      );
    },
    [id, password, name]
  );
  return (
    <AppLayout>
      <form>
        <div className={`${signupStyles.signup} ${signupStyles.panel}`}>
          <div>
            <h1>Signup</h1>
          </div>
          <div className={signupStyles.row}>
            <label htmlFor="user-id">아이디</label>
            <input
              name="user-id"
              type="text"
              value={id}
              onChange={setId}
              required
            />
          </div>
          <div className={signupStyles.row}>
            <label htmlFor="user-password">비밀번호</label>
            <input
              type="password"
              name="user-password"
              value={password}
              onChange={setPassword}
              id=""
            />
          </div>
          <div className={signupStyles.row}>
            <label htmlFor="user-name">이름</label>
            <input
              type="text"
              name="user-name"
              value={name}
              onChange={setName}
              id=""
            />
          </div>
          <div className={signupStyles.row}>
            <button onClick={onSubmit}>회원가입</button>
          </div>
        </div>
      </form>
    </AppLayout>
  );
};

export default Signup;
