import { Link } from "react-router-dom";
import "./CSS/Signup.css";

function Signup() {
  return (
    <div className="signup">
      <div className="signup-container">
        <h1>Sign Up</h1>
        <div className="signup-fields">
          <input type="" placeholder="Your Name" />
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Repeat Password" />
        </div>
        <button>Register</button>
        <p className="signup-text">
          Already have an account?{" "}
          <Link to={"/login"}>
            <span>Login Here</span>
          </Link>
        </p>
        <div className="signup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
