import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserTie,
  FaCalendarAlt,
  FaClock,
  FaStickyNote,
  FaCheckCircle,
} from "react-icons/fa";

const CreateReservation = () => {
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [trainers, setTrainers] = useState([]);
  const [formData, setFormData] = useState({
    trainerId: "",
    sessionDate: "",
    sessionTime: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);

  const showError = (msg) => {
    setModalMessage(msg);
    setShowModal(true);
    const modal = new window.bootstrap.Modal(
      document.getElementById("errorModal")
    );
    modal.show();
  };

  // Fetch trainers
  useEffect(() => {
    fetch("http://localhost:8070/trainer/")
      .then((res) => res.json())
      .then((data) => setTrainers(data))
      .catch((err) => console.error("Error fetching trainers:", err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      showError("Please log in to continue.");
      navigate("/signin");
    }
  }, []);

  const validateForm = () => {                                              
    const newErrors = {};
    let isValid = true;

    if (!formData.trainerId) {                               //validatio
      newErrors.trainerId = "Please select a trainer.";
      isValid = false;
    }

    if (!formData.sessionDate) {
      newErrors.sessionDate = "Please select a date.";
      isValid = false;
    } else {
      const today = new Date();
      const selectedDate = new Date(formData.sessionDate);
      today.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.sessionDate = "Session date cannot be in the past.";
        isValid = false;
      }
    }

    if (!formData.sessionTime) {
      newErrors.sessionTime = "Please select a time.";
      isValid = false;
    } else if (formData.sessionDate) {
      const now = new Date();
      const selectedDateTime = new Date(
        `${formData.sessionDate}T${formData.sessionTime}`
      );

      if (selectedDateTime < now) {
        newErrors.sessionTime = "Session time cannot be in the past.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: null,
    }));
  };

  const checkAvailability = async () => {
    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      showError("Please log in to check trainer availability.");
      return;
    }

    try {
      setLoading(true);
      const query = new URLSearchParams({
        trainerId: formData.trainerId,
        sessionDate: formData.sessionDate,
        sessionTime: formData.sessionTime,
      });

      const response = await fetch(
        `http://localhost:8070/reservations/check-availability?${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setAvailability(data);
    } catch (error) {
      console.error("Error checking availability:", error);
      showError("Could not check availability. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      showError("Please log in to continue.");
      return;
    }

    if (!availability?.available) {
      showError("Trainer is not available at the selected time.");
      return;
    }

    const reservationData = {
      ...formData,
      userId,
      status: "Pending",
    };

    try {
      const response = await fetch("http://localhost:8070/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        const error = await response.json();
        showError(error.message || "Failed to create reservation.");
        return;
      }

      const reservation = await response.json();

      navigate("/my-reservations", {
        state: { reservation },
      });
    } catch (error) {
      console.error("Reservation error:", error);
      showError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center text-light p-3">
      <div
        className="card bg-secondary p-4 rounded-4 shadow-lg w-100"
        style={{ maxWidth: "700px" }}
      >
        <h3 className="text-center mb-4">Create Reservation</h3>
        <p className="text-center text-warning small">
          ⚠️ Each session lasts <strong>3 hours</strong>.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3 text-start">
              <label className="form-label">
                <FaUserTie className="me-2" />
                Trainer
              </label>
              <select
                name="trainerId"
                className="form-select bg-dark text-light border-secondary"
                value={formData.trainerId}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Trainer --</option>
                {trainers.map((trainer) => (
                  <option key={trainer._id} value={trainer._id}>
                    {trainer.firstname} {trainer.lastname}
                  </option>
                ))}
              </select>
              {errors.trainerId && (
                <div className="text-danger small">{errors.trainerId}</div>
              )}
            </div>

            <div className="col-md-6 mb-3 text-start">
              <label className="form-label">
                <FaCalendarAlt className="me-2" />
                Date
              </label>
              <input
                type="date"
                name="sessionDate"
                className="form-control bg-dark text-light border-secondary"
                value={formData.sessionDate}
                onChange={handleChange}
                required
              />
              {errors.sessionDate && (
                <div className="text-danger small">{errors.sessionDate}</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3 text-start">
              <label className="form-label">
                <FaClock className="me-2" />
                Time
              </label>
              <input
                type="time"
                name="sessionTime"
                className="form-control bg-dark text-light border-secondary"
                value={formData.sessionTime}
                onChange={handleChange}
                required
              />
              {errors.sessionTime && (
                <div className="text-danger small">{errors.sessionTime}</div>
              )}
            </div>

            <div className="col-md-6 mb-3 text-start">
              <label className="form-label">
                <FaStickyNote className="me-2" />
                Notes
              </label>
              <input
                type="text"
                name="notes"
                className="form-control bg-dark text-light border-secondary"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Optional notes"
              />
            </div>
          </div>

          {availability && (
            <div className="mb-3 text-center">
              {availability.available ? (
                <span className="text-light">
                  <FaCheckCircle className="me-1" /> Trainer is available at
                  selected time.
                </span>
              ) : (
                <span className="text-danger">
                  Trainer is not available at selected time.
                </span>
              )}
            </div>
          )}

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={checkAvailability}
              disabled={loading}
            >
              {loading ? "Checking..." : "Check Availability"}
            </button>
            <button type="submit" className="btn btn-primary">
              Reserve Session
            </button>
          </div>
        </form>
      </div>
      {/* Error/Info Modal */}
      <div
        className="modal fade"
        id="errorModal"
        tabIndex="-1"
        aria-labelledby="errorModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-danger text-white">
            <div className="modal-header border-0">
              <h5 className="modal-title" id="errorModalLabel">
                Error
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

export default CreateReservation;
