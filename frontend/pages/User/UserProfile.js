import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaSignOutAlt,
  FaIdBadge,
} from "react-icons/fa";

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    if (!token) {
      console.error("JWT token not found in localStorage");
      navigate("/signin");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8070/user/get/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else if (response.status === 401) {
        alert("Session expired. Please log in again.");
        handleLogout();
      } else {
        console.error("Failed to fetch user profile data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-light">
      <div
        className="card bg-secondary p-4 rounded-4 shadow-lg"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <div className="text-center mb-4">
          <FaUser size={60} className="mb-2" />
          <h3 className="fw-bold mb-0">
            {userData.firstname} {userData.lastname}
          </h3>
          <small className="text-light">
            {userData.role && userData.role.toUpperCase()}
          </small>
        </div>

        <hr className="border-light" />
        <div className="mb-3 d-flex align-items-center">
          <FaEnvelope className="me-3" />
          <strong>Email:</strong>&nbsp;{" "}
          <span className="ms-2">{userData.email}</span>
        </div>

        <div className="mb-4 d-flex align-items-center">
          <FaPhone className="me-3" />
          <strong>Contact:</strong>&nbsp;{" "}
          <span className="ms-2">{userData.contact}</span>
        </div>

        <div className="d-grid gap-2">
          <div className="row justify-content-center">
            <a href="/edit-profile" className="btn btn-light text-dark col-4 mx-2">
              Edit Profile
            </a>
            <a href="/my-reservations" className="btn btn-light text-dark col-4 mx-2">
              Reservations
            </a>
          </div>
          <button onClick={handleLogout} className="btn btn-outline-light">
            <FaSignOutAlt className="me-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
