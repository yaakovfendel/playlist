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
