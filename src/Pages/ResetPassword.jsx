import Loading from "../Components/Loading/Loading";
import "./CSS/ResetPassword.css";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
// ✅ import toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmitResetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Fill the field");
      return;
    }
    console.log(email);
    try {
      setLoading(true);
      const response = await fetch(
        "https://ecommerce-backend-935007092710.europe-west3.run.app/api/user/password-reset/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Fail");
      }

      const data = await response.json();
      if (data.detail) {
        toast.success("Password reset link was sent to your email.");
        setEmail("");
      }
      console.log(data);
    } catch (error) {
      console.error("❌ Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resetpassword">
      <div className="resetpassword-container">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmitResetPassword}>
          <div className="resetpassword-fields">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Address"
            />
          </div>
          <button type="submit">
            {loading ? <Loading /> : <span>Continue</span>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
