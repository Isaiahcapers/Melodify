import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Optionally: check if token exists and store it
        if (data.token) {
          localStorage.setItem("token", data.token); // Store JWT token
          alert("Logged in successfully!");
          navigate("/"); // Redirect to Home Page after successful login
        } else {
          alert("Login failed: Invalid token received.");
        }
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed due to a network error.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h4 className="login-title">Ready to start your Journey?</h4>
      <div className="form-group">
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label className="checkbox-label">
          <input type="checkbox" /> Stay signed in
        </label>
      </div>
      <button type="submit" className="login-button">Login</button>
      <a href="#" className="forgot-password">Forgot Password?</a>
    </form>
  );
};

export default LoginForm;
