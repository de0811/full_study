import AppLayout from "@/components/AppLayout";
import userInptut from "@/hook/userInptut";
import { useCallback } from "react";
import signupStyles from "@/styles/signup.module.css";
import { useDispatch } from "react-redux";
import { login } from "@/redux/reducer/myInfo";

const Login = () => {
  const dispatch = useDispatch();
  const [id, setId] = userInptut("");
  const [password, setPassword] = userInptut("");
  const [name, setName] = userInptut("");
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!id || !password) {
        alert("빈칸을 채워주세요");
        return;
      }

      dispatch( login({
        email: id,
        password,
      }) );
      console.log("login...");
    },
    [id, password]
  );
  return (
    <form>
      <div className={`${signupStyles.signup} ${signupStyles.panel}`}>
        <div>
          <h1>Login</h1>
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
          <button onClick={onSubmit}>Login</button>
        </div>
      </div>
    </form>
  );
};

export default Login;
