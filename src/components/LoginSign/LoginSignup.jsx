import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext/UserContext";
import { loginUser, createUser } from "../../utils/Api";
import HomePage from  "../../components/HomePage/HomePage";
import { FaArrowLeft } from "react-icons/fa"; // Import the back arrow icon

import user_icon from "../../assets/person.png";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";
import "./LoginSignup.css";

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { updateUser } = useUser();
  const navigate = useNavigate();

  // Login Functionality
  const handleLogin = async () => {
    if (email && password) {
      try {
        const user = await loginUser({ email, password });
        if (user && user.name) {
          updateUser(user.name);
          alert(`Welcome, ${user.name}!`);
          setError("");
          navigate("/home-page");
        } else {
          setError("Invalid email or password.");
        }
      } catch (err) {
        setError("Error: " + err.message);
      }
    } else {
      setError("Please fill in both email and password.");
    }
  };

  // Signup Functionality
  const handleSignUp = async () => {
    if (name && email && password) {
      try {
        const user = await createUser({ name, email, password });
        if (user) {
          alert("User successfully registered!");
          setAction("Login");
        }
      } catch (err) {
        setError("Registration failed. Please check your details.");
      }
    } else {
      setError("Please fill in all the fields.");
    }
  };

  // Navigate back to the previous page
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="auth-container">
      {/* Back Arrow */}
      <div className="back-arrow" onClick={handleBack}>
        <FaArrowLeft />
      </div>

      {/* Left Section */}
      <div className="auth-left">
        <h1>{action === "Login" ? "Login to your account" : "Create an account"}</h1>
        <form className="auth-form">
          {action === "Sign Up" && (
            <div className="input-group">
              <img src={user_icon} alt="user" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="input-group">
            <img src={email_icon} alt="email" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <img src={password_icon} alt="password" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button
            type="button"
            className="submit-btn"
            onClick={action === "Login" ? handleLogin : handleSignUp}
          >
            {action === "Login" ? "Login" : "Sign Up"}
          </button>
        </form>
        <p>
          {action === "Login" ? (
            <>
              Don't have an account?{" "}
              <span onClick={() => setAction("Sign Up")}>Sign Up</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setAction("Login")}>Login</span>
            </>
          )}
        </p>
      </div>

      {/* Right Section */}
      <div className="auth-right">
        <div className="auth-image"></div>
      </div>
    </div>
  );
};

export default LoginSignup;
