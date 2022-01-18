import { useRef } from "react";

export default function Login({
  userName,
  setUserName,
  userPassword,
  setUserPassword,
  login,
}) {
  const user = useRef();
  const password = useRef();
  return (
    <div>
      <h3>LOGIN</h3>
      <input
        ref={user}
        type="text"
        className="form-control "
        placeholder="enter user name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        ref={password}
        type="text"
        className="form-control "
        placeholder="enter user password"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
      />
      <div>
        <button
          className="btn"
          onClick={() => login(user.current.value, password.current.value)}
        >
          login
        </button>
      </div>
    </div>
  );
}
