import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import c2 from "../images/hero3.jpg";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      alert(
        "Password must contain at least one capital letter, one number, and be at least 8 characters long"
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8070/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/signin");
      } else {
        alert("This email is already Registered");
      }
    } catch (error) {
      console.error("Error:", error);
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
        style={{ minWidth: "350px", maxWidth: "600px", width: "100%" }}
      >
        <h3 className="text-center mb-4">Create Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3 text-start">
              <label className="form-label">
                <FaUser className="me-2" />
                First Name
              </label>
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                placeholder="First name"
                required
              />
            </div>
            <div className="col-md-6 mb-3 text-start">
              <label className="form-label">
                <FaUser className="me-2" />
                Last Name
              </label>
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                placeholder="Last name"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3 text-start">
              <label className="form-label">
                <FaEnvelope className="me-2" />
                Email
              </label>
              <input
                type="email"
                className="form-control bg-dark text-light border-secondary"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="col-md-6 mb-3 text-start">
              <label className="form-label">
                <FaPhone className="me-2" />
                Contact
              </label>
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                placeholder="Contact number"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3 text-start">
              <label className="form-label">
                <FaLock className="me-2" />
                Password
              </label>
              <input
                type="password"
                className="form-control bg-dark text-light border-secondary"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
            </div>
            <div className="col-md-6 mb-4 text-start">
              <label className="form-label">
                <FaLock className="me-2" />
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control bg-dark text-light border-secondary"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                required
              />
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-outline-light">
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-3 text-center">
          <span className="text-light small">Already have an account? </span>
          <a href="/signin" className="text-decoration-none text-light small">
            Sign in here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
