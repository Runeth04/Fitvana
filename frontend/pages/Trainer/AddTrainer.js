import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { decodeJWT } from "../../utils/decodeJWT";

export default function AddTrainer() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    specialization: "",
    experience: "",
    gender: "",
    bio: "",
    certifications: "",
    rating: "",
    socialLinks: {
      linkedIn: "",
      instagram: "",
      facebook: "",
    },
  });
  const [profileImage, setProfileImage] = useState(null);

  const specializationOptions = [
    "Strength Training",
    "Cardio Fitness",
    "Yoga",
    "CrossFit",
    "Zumba",
    "Bodybuilding",
    "Weight Loss",
    "Functional Training",
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = decodeJWT(token);
    if (decoded?.role === "admin") {
      setIsAdmin(true);
    } else {
      alert("Access denied. Only admins can add trainers.");
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("socialLinks.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [field]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrors((prev) => ({
      ...prev,
      [name]: null,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Required fields
    const requiredFields = [
      "firstname",
      "lastname",
      "email",
      "contact",
      "specialization",
      "experience",
      "gender",
      "bio",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field] || !formData[field].trim()) {
        newErrors[field] = "This field is required";
        isValid = false;
      }
    });

    // Email
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Contact Number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.contact)) {
      newErrors.contact = "Contact must be a 10-digit number";
      isValid = false;
    }

    // Experience
    if (isNaN(formData.experience) || formData.experience < 0) {
      newErrors.experience = "Experience must be a positive number";
      isValid = false;
    }

    // Rating
    if (formData.rating) {
      if (
        isNaN(formData.rating) ||
        formData.rating < 0 ||
        formData.rating > 5
      ) {
        newErrors.rating = "Rating must be between 0 and 5";
        isValid = false;
      }
    }

    // Certifications 
    if (
      formData.certifications &&
      typeof formData.certifications !== "string"
    ) {
      newErrors.certifications =
        "Certifications must be a comma-separated string";
      isValid = false;
    }

    // Image (optional)
    if (profileImage) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(profileImage.type)) {
        newErrors.profileImage = "Image must be JPG or PNG";
        isValid = false;
      }
      if (profileImage.size > 2 * 1024 * 1024) {
        newErrors.profileImage = "Image must be under 2MB";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin || !validateForm()) return;

    const token = localStorage.getItem("token");

    try {
      const body = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "socialLinks") {
          body.append(key, JSON.stringify(value));
        } else {
          body.append(key, value);
        }
      });
      if (profileImage) body.append("profileImage", profileImage);

      const response = await fetch("http://localhost:8070/trainer/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      if (response.ok) {
        navigate("/admin-dashboard");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to add trainer");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark text-light">
      <div className="card bg-light p-4 col-lg-8 shadow-lg rounded-4">
        <h3 className="text-center mb-4">Add Trainer</h3>
        <form onSubmit={handleSubmit} noValidate>
          <div className="row text-start">
            <div className="mb-3 col-md-6">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstname"
                className={`form-control bg-dark text-light border-secondary ${
                  errors.firstname ? "is-invalid" : ""
                }`}
                value={formData.firstname}
                onChange={handleInputChange}
              />
              {errors.firstname && (
                <div className="invalid-feedback">{errors.firstname}</div>
              )}
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastname"
                className={`form-control bg-dark text-light border-secondary ${
                  errors.lastname ? "is-invalid" : ""
                }`}
                value={formData.lastname}
                onChange={handleInputChange}
              />
              {errors.lastname && (
                <div className="invalid-feedback">{errors.lastname}</div>
              )}
            </div>
          </div>

          <div className="row text-start">
            <div className="mb-3 col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className={`form-control bg-dark text-light border-secondary ${
                  errors.email ? "is-invalid" : ""
                }`}
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Contact</label>
              <input
                type="text"
                name="contact"
                className={`form-control bg-dark text-light border-secondary ${
                  errors.contact ? "is-invalid" : ""
                }`}
                value={formData.contact}
                onChange={handleInputChange}
              />
              {errors.contact && (
                <div className="invalid-feedback">{errors.contact}</div>
              )}
            </div>
          </div>

          <div className="row text-start">
            <div className="mb-3 col-md-6">
              <label className="form-label">Specialization</label>
              <select
                name="specialization"
                className={`form-select bg-dark text-light border-secondary ${
                  errors.specialization ? "is-invalid" : ""
                }`}
                value={formData.specialization}
                onChange={handleInputChange}
              >
                <option value="">Select specialization</option>
                {specializationOptions.map((spec, i) => (
                  <option key={i} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
              {errors.specialization && (
                <div className="invalid-feedback">{errors.specialization}</div>
              )}
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Experience (Years)</label>
              <input
                type="number"
                name="experience"
                className={`form-control bg-dark text-light border-secondary ${
                  errors.experience ? "is-invalid" : ""
                }`}
                value={formData.experience}
                onChange={handleInputChange}
              />
              {errors.experience && (
                <div className="invalid-feedback">{errors.experience}</div>
              )}
            </div>
          </div>

          <div className="row text-start">
            <div className="mb-3 col-md-6">
              <label className="form-label">Gender</label>
              <select
                name="gender"
                className={`form-select bg-dark text-light border-secondary ${
                  errors.gender ? "is-invalid" : ""
                }`}
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              {errors.gender && (
                <div className="invalid-feedback">{errors.gender}</div>
              )}
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label">Rating (1–5)</label>
              <input
                type="number"
                name="rating"
                max={5}
                min={0}
                step={0.1}
                className={`form-control bg-dark text-light border-secondary ${
                  errors.rating ? "is-invalid" : ""
                }`}
                value={formData.rating}
                onChange={handleInputChange}
              />
              {errors.rating && (
                <div className="invalid-feedback">{errors.rating}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Bio</label>
            <textarea
              name="bio"
              className={`form-control bg-dark text-light border-secondary ${
                errors.bio ? "is-invalid" : ""
              }`}
              rows={2}
              value={formData.bio}
              onChange={handleInputChange}
            ></textarea>
            {errors.bio && <div className="invalid-feedback">{errors.bio}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">
              Certifications (comma-separated)
            </label>
            <input
              type="text"
              name="certifications"
              className={`form-control bg-dark text-light border-secondary ${
                errors.certifications ? "is-invalid" : ""
              }`}
              value={formData.certifications}
              onChange={handleInputChange}
            />
            {errors.certifications && (
              <div className="invalid-feedback">{errors.certifications}</div>
            )}
          </div>


          <div className="row text-start">
            <div className="mb-3 col-md-4">
              <label className="form-label">LinkedIn</label>
              <input
                type="text"
                name="socialLinks.linkedIn"
                className={`form-control bg-dark text-light border-secondary ${
                  errors["socialLinks.linkedIn"] ? "is-invalid" : ""
                }`}
                value={formData.socialLinks.linkedIn}
                onChange={handleInputChange}
              />
              {errors["socialLinks.linkedIn"] && (
                <div className="invalid-feedback">
                  {errors["socialLinks.linkedIn"]}
                </div>
              )}
            </div>

            <div className="mb-3 col-md-4">
              <label className="form-label">Instagram</label>
              <input
                type="text"
                name="socialLinks.instagram"
                className={`form-control bg-dark text-light border-secondary ${
                  errors["socialLinks.instagram"] ? "is-invalid" : ""
                }`}
                value={formData.socialLinks.instagram}
                onChange={handleInputChange}
              />
              {errors["socialLinks.instagram"] && (
                <div className="invalid-feedback">
                  {errors["socialLinks.instagram"]}
                </div>
              )}
            </div>

            <div className="mb-3 col-md-4">
              <label className="form-label">Facebook</label>
              <input
                type="text"
                name="socialLinks.facebook"
                className={`form-control bg-dark text-light border-secondary ${
                  errors["socialLinks.facebook"] ? "is-invalid" : ""
                }`}
                value={formData.socialLinks.facebook}
                onChange={handleInputChange}
              />
              {errors["socialLinks.facebook"] && (
                <div className="invalid-feedback">
                  {errors["socialLinks.facebook"]}
                </div>
              )}
            </div>
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
              className={`form-control bg-dark text-light border-secondary ${
                errors.profileImage ? "is-invalid" : ""
              }`}
            />
            {errors.profileImage && (
              <div className="invalid-feedback">{errors.profileImage}</div>
            )}
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-dark mt-2">
              Add Trainer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
