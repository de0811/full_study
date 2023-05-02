import Link from "next/link";
import { ButtonHTMLAttributes, useCallback, useState } from "react";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onChangeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }, []);
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

const onSubmitForm = useCallback((e: React.FormEvent<HTMLButtonElement>) => {
  e.preventDefault();
  console.log({
    id,
    password,
  });
}, [id, password]);
  
  return (
    <div>
      <form>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <input
            name="user-id"
            type="text"
            onChange={onChangeId}
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
            onChange={onChangePassword}
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
