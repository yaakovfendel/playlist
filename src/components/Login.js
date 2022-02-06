import { useRef } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
export default function Login({
  userName,
  setUserName,
  userPassword,
  setUserPassword,
  register,
  login,
  get_all_users_from_mongo,
  User,
}) {
  return (
    <div>
      <button className="btn">
        <Link to={`/`}>Signup</Link>
      </button>
      <button className="btn">
        <Link to={`/Signin`}>Signin</Link>
      </button>
    </div>
  );
}

// <h3 className="logintitle">LOGIN</h3>
//   className="btn"
//   onClick={() => login(user.current.value, password.current.value)}
// >
//   login
// onClick={() => register(user.current.value, password.current.value)}
// >
//   register

// <button className="btn" onClick={() => get_all_users_from_mongo()}>
//   get_all_users_from_mongo
// </button>

// <div>
//   <input
//     ref={user}
//     type="text"
//     className="form-control-login"
//     placeholder="enter user name"
//     value={userName}
//     onChange={(e) => setUserName(e.target.value)}
//   />
// </div>
// <div>
//   <input
//     ref={password}
//     type="text"
//     className="form-control-login"
//     placeholder="enter user password"
//     value={userPassword}
//     onChange={(e) => setUserPassword(e.target.value)}
//   />
// </div>

// const user = useRef();
// const password = useRef();
