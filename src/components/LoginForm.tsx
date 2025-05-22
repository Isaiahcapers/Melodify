// import { jwtDecode } from 'jwt-decode';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); // Reset the error message before the request
    setSuccessMessage(null); // Reset the success message

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        // Decode the JWT token to get user information
        // const decodedToken: any = jwtDecode(token);

        // Store token in localStorage
        localStorage.setItem("token", token);

        // Set success message and redirect to home
        setSuccessMessage("Logged in successfully! Redirecting to home...");
        setErrorMessage(null);
        setTimeout(() => {
          navigate("/home"); // Redirect to Home Page after a short delay
        }, 1500);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Login failed");
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Login failed due to a network error.");
      setSuccessMessage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h4 className="login-title">Ready to start your Journey?</h4>
      <div className="form-group">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="login-button">Login</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>
  );
};

export default LoginForm;
