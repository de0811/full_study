import AppLayout from "@/components/AppLayout";
import userInptut from "@/hook/userInptut";

const Signup = () => {
  const [id, setId] = userInptut('');
  const [password, setPassword] = userInptut('');
  const [name, setName] = userInptut('');
  return (
    <AppLayout>
      <div>Signup</div>
      <form>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <input name="user-id" type="text" value={id} onChange={setId} required />
          <br />
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <input type="password" name="user-password" value={password} onChange={setPassword} id="" />
          <br />
          <label htmlFor="user-name">이름</label>
          <br />
          <input type="text" name="user-name" value={name} onChange={setName} id="" />
        </div>
      </form>
    </AppLayout>
  );
};

export default Signup;
