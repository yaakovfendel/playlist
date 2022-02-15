import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/Signup";
import Employe from "./components/Employe";

import Home from "./Home";

export default function App() {
  const [User, setUser] = useState(null);
  const [userPassword, setUserPassword] = useState([]);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <SignUp
                User={User}
                setUser={setUser}
                userPassword={userPassword}
                setUserPassword={setUserPassword}
              />
            }
          ></Route>
          <Route
            exact
            path="/Home"
            element={
              <Home
                User={User}
                setUser={setUser}
                userPassword={userPassword}
                setUserPassword={setUserPassword}
              />
            }
          ></Route>
          <Route
            exact
            path="/Signin"
            element={
              <SignIn
                User={User}
                setUser={setUser}
                userPassword={userPassword}
                setUserPassword={setUserPassword}
              />
            }
          ></Route>
          <Route exact path="/Employe" element={<Employe />}></Route>
        </Routes>
      </Router>
    </div>
  );
}
