import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import c2 from "../images/hero3.jpg";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const decodeJWT = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8070/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);

        const { token } = data;

        localStorage.setItem("token", token);

        const decoded = decodeJWT(token);
        if (decoded) {
          localStorage.setItem("userId", decoded.userId);
          localStorage.setItem("role", decoded.role);
          localStorage.setItem("firstname", decoded.firstname);
          localStorage.setItem("lastname", decoded.lastname);

          switch (decoded.role) {
            case "admin":
              window.location.href = "/admin-dashboard";
              break;
            case "trainer":
              window.location.href = "/trainer-dashboard";
              break;
            case "user":
            default:
              window.location.href = "/";
              break;
          }
        }
      } else {
        console.error("Login failed:", data.error);
        alert(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 text-light"
      style={{
        backgroundImage: `url(${c2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backgroundBlendMode: "overlay",
      }}
    >
      <div
        className="card bg-secondary p-4 rounded-4 shadow-lg"
        style={{ minWidth: "350px", maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-4">Sign In</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label">
              <FaEnvelope className="me-2" />
              Email address
            </label>
            <input
              type="email"
              className="form-control bg-dark text-light border-secondary"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label">
              <FaLock className="me-2" />
              Password
            </label>
            <input
              type="password"
              className="form-control bg-dark text-light border-secondary"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-outline-light">
              Login
            </button>
          </div>
          <div className="mt-3 text-center">
            <span className="text-light small">Don't have an account? </span>
            <a href="/signup" className="text-decoration-none text-light small">
              Sign Up in here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
