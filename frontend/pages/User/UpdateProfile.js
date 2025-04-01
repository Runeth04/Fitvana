import React, { useEffect, useState } from "react";
import { Modal } from "bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaUser, FaPhone, FaSave } from "react-icons/fa";

import c2 from "../../images/hero3.jpg";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
  });
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        setModalMessage("Unauthorized. Please log in again.");
        setIsError(true);
        const modal = new Modal(document.getElementById("feedbackModal"));
        modal.show();
        return;
      }

      try {
        const response = await fetch(`http://localhost:8070/user/get/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({
            firstname: data.firstname || "",
            lastname: data.lastname || "",
            email: data.email || "",
            contact: data.contact || "",
          });
        } else {
          setModalMessage("Failed to fetch user data.");
          setIsError(true);
          const modal = new Modal(document.getElementById("feedbackModal"));
          modal.show();
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const validateForm = () => {
    const { firstname, lastname, email, contact } = formData;

    if (!firstname || !lastname || !email || !contact) {
      setModalMessage("All fields are required.");
      setIsError(true);
      return false;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setModalMessage("Invalid email format.");
      setIsError(true);
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(contact)) {
      setModalMessage("Phone number must be 10 digits.");
      setIsError(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const modal = new Modal(document.getElementById("feedbackModal"));
      modal.show();
      return;
    }

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:8070/user/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setModalMessage("Profile updated successfully!");
        setIsError(false);
      } else {
        setModalMessage("Failed to update profile.");
        setIsError(true);
      }
      const modal = new Modal(document.getElementById("feedbackModal"));
      modal.show();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        <h3 className="text-center mb-4">Update Profile</h3>
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

          <div className="mb-3 text-start">
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

          <div className="mb-4 text-start">
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

          <div className="d-grid">
            <button type="submit" className="btn btn-outline-light">
              <FaSave className="me-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="feedbackModal"
        tabIndex="-1"
        aria-labelledby="feedbackModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className={`modal-content ${isError ? "bg-danger" : "bg-dark"} text-light`}>
            <div className="modal-header border-0">
              <h5 className="modal-title" id="feedbackModalLabel">
                {isError ? "Error" : "Success"}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{modalMessage}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
