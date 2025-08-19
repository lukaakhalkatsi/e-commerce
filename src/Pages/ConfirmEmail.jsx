import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ConfirmEmail() {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await fetch(
          "https://ecommerce-backend-935007092710.europe-west3.run.app/api/user/confirm-email/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uidb64, token }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to confirm email");
        }

        const data = await response.json();
        console.log("✅ Confirmed:", data);

        // Optional: redirect after 2s
        setTimeout(() => navigate("/login"), 5000);
      } catch (error) {
        console.error("❌ Error:", error);
      }
    };

    confirmEmail();
  }, [uidb64, token, navigate]);

  return (
    <div>
      <h1>Email Confirmation</h1>
      <p>ID: {uidb64}</p>
      <p>Token: {token}</p>
    </div>
  );
}

export default ConfirmEmail;
