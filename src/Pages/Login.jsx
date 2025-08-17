import { Link } from "react-router-dom";
import "./CSS/Login.css";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      login(username, password);
      console.log(username, password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1>Login</h1>
        <div className="login-fields">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="email"
            placeholder="Email Address"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </div>
        <button onClick={handleSubmitLogin}>Continue</button>
        <p className="login-text">
          Don't have an account?{" "}
          <Link to={"/signup"}>
            <span>Register Here</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
