import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create an Account</h2>

        <div className="input-group">
          <label>Full Name:</label>
          <input
            type="text"
            className="registerInput"
            placeholder="Enter your username..."
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Email:</label>
          <input
            type="text"
            className="registerInput"
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            className="registerInput"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="terms">
          <label>
            <input type="checkbox" />I agree to the Terms & Conditions
          </label>
        </div>

        <button type="submit" className="register-btnn">
          Register
        </button>

        <p className="login-link">
          Already have an account?{" "}
          <Link className="login" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
