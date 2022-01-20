import "./Logged.css";

export default function Logged({ logout, User }) {
  return (
    <div>
      <h3 className="logintitleloggedin">
        {" "}
        {User[0]} welcom to your play list
      </h3>
      <div>
        <button className="btn" onClick={() => logout()}>
          logout
        </button>
      </div>
    </div>
  );
}
