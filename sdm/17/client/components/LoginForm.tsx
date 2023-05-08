import userInptut from "@/hook/userInptut";
import Link from "next/link";
import { ButtonHTMLAttributes, useCallback, useState } from "react";

const LoginForm = ({
  setIsLogin,
}: {
  setIsLogin: (isLogin: boolean) => void;
}) => {
  const [id, setId] = userInptut("");
  const [password, setPassword] = userInptut("");

  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      console.log({
        id,
        password,
      });
      setIsLogin(true);
    },
    [id, password]
  );

  return (
    <div>
      <form>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <input
            name="user-id"
            type="text"
            onChange={setId}
            value={id}
            required
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <input
            name="user-password"
            type="password"
            onChange={setPassword}
            value={password}
            required
          />
        </div>
        <button onClick={onSubmitForm}>로그인</button>
        <Link href="/signup">
          <button>회원가입</button>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
