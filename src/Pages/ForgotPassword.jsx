import Loading from "../Components/Loading/Loading";
import "./CSS/ForgotPassword.css";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

function ForgotPassword() {
  const { loading } = useContext(AuthContext);
  return (
    <div className="resetpassword">
      <div className="resetpassword-container">
        <h1>Reset Password</h1>
        <form>
          <div className="resetpassword-fields">
            <input type="email" placeholder="Email Address" />
          </div>
          <button type="submit">
            {loading ? <Loading /> : <span>Continue</span>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
