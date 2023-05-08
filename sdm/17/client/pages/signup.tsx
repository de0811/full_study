import AppLayout from "@/components/AppLayout";
import userInptut from "@/hook/userInptut";
import { addUser } from "@/modules/users";
import { useCallback } from "react";
import signupStyles from "@/styles/signup.module.css";

const Signup = () => {
  const [id, setId] = userInptut("");
  const [password, setPassword] = userInptut("");
  const [name, setName] = userInptut("");
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      if( id || password || name ) {
        alert("빈칸을 채워주세요");
        return;
      }

      addUser({
        id,
        password,
        name,
      });
    },
    [id, password, name]
  );
  return (
    <AppLayout>
      <div>회원가입</div>
      <form>
        <div>
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
