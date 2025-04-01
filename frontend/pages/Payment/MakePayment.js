import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMoneyBillWave, FaIdCard, FaCreditCard } from "react-icons/fa";

export default function PackagePaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const packageDetails = location.state;

  const [formData, setFormData] = useState({
    nic: "",
    paymentMethod: "Online",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    transactionId: `TXN-${Date.now()}`,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!packageDetails) {
      alert("No package selected. Redirecting...");
      navigate("/packages");
    }
  }, [navigate, packageDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.nic.trim()) {
      newErrors.nic = "NIC is required";
      isValid = false;
    } else if (formData.nic.length < 10) {
      newErrors.nic = "NIC must be at least 10 characters";
      isValid = false;
    }

    if (!formData.cardName.trim()) {
      newErrors.cardName = "Cardholder name is required";
      isValid = false;
    }

    if (!/^(\d{4} \d{4} \d{4} \d{4})$/.test(formData.cardNumber)) {
      newErrors.cardNumber = "Card number must be in '1234 5678 9012 3456' format";
      isValid = false;
    }

    if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(formData.expiry)) {
      newErrors.expiry = "Expiry must be in MM/YY format";
      isValid = false;
    }

    if (!/^[0-9]{3}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      nic: formData.nic,
      packageType: packageDetails.packageType,
      amount: packageDetails.amount,
      paymentMethod: formData.paymentMethod,
      cardName: formData.cardName,
      cardLast4: formData.cardNumber,
      transactionId: formData.transactionId,
      status: "Completed",
    };

    try {
      const res = await fetch("http://localhost:8070/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Payment successful!");
        navigate("/packages");
      } else {
        const err = await res.json();
        alert(err.error || "Failed to process payment");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark text-white min-vh-100">
      <div className="card bg-secondary text-white p-4 shadow-lg" style={{ maxWidth: "450px", width: "100%" }}>
        <h4 className="text-center mb-3">Payment for {packageDetails?.packageType}</h4>
        <p className="text-center text-muted">Amount: <strong>LKR {packageDetails?.amount?.toLocaleString()}</strong></p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label"><FaIdCard className="me-2" />NIC <span className="text-danger">*</span></label>
            <input
              type="text"
              name="nic"
              className={`form-control bg-dark text-white ${errors.nic ? "is-invalid" : ""}`}
              value={formData.nic}
              onChange={handleInputChange}
            />
            {errors.nic && <div className="invalid-feedback">{errors.nic}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label"><FaMoneyBillWave className="me-2" />Payment Method <span className="text-danger">*</span></label>
            <select
              name="paymentMethod"
              className="form-select bg-dark text-white"
              value={formData.paymentMethod}
              onChange={handleInputChange}
            >
              <option value="Online">Online</option>
              <option value="Cash">Cash</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label"><FaCreditCard className="me-2" />Cardholder Name <span className="text-danger">*</span></label>
            <input
              type="text"
              name="cardName"
              className={`form-control bg-dark text-white ${errors.cardName ? "is-invalid" : ""}`}
              value={formData.cardName}
              onChange={handleInputChange}
            />
            {errors.cardName && <div className="invalid-feedback">{errors.cardName}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Card Number <span className="text-danger">*</span></label>
            <input
              type="text"
              name="cardNumber"
              className={`form-control bg-dark text-white ${errors.cardNumber ? "is-invalid" : ""}`}
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
            />
            {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
          </div>

          <div className="row">
            <div className="mb-3 col-md-6">
              <label className="form-label">Expiry (MM/YY) <span className="text-danger">*</span></label>
              <input
                type="text"
                name="expiry"
                className={`form-control bg-dark text-white ${errors.expiry ? "is-invalid" : ""}`}
                value={formData.expiry}
                onChange={handleInputChange}
                placeholder="08/25"
              />
              {errors.expiry && <div className="invalid-feedback">{errors.expiry}</div>}
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label">CVV <span className="text-danger">*</span></label>
              <input
                type="text"
                name="cvv"
                maxLength={3}
                className={`form-control bg-dark text-white ${errors.cvv ? "is-invalid" : ""}`}
                value={formData.cvv}
                onChange={handleInputChange}
              />
              {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-outline-light mt-3 w-100">Submit Payment</button>
          </div>
        </form>
      </div>
    </div>
  );
}
