import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const packages = [
  {
    name: "Weekly Package",
    duration: "1 Week",
    price: 1500,
    benefits: ["Access to gym facilities", "1 Personal Training Session", "Free diet plan"],
  },
  {
    name: "Monthly Package",
    duration: "1 Month",
    price: 5000,
    benefits: ["Unlimited gym access", "4 Personal Training Sessions", "Custom diet plan","selected supliments"],
  },
  {
    name: "Annual Package",
    duration: "12 Months",
    price: 50000,
    benefits: [
      "Unlimited gym access",
      "Weekly Personal Training",
      "Free diet consultation",
      "Merchandise pack",
    ],
  },
];

export default function PackageDetails() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please sign in to continue.");
      navigate("/signin");
    }
  }, [navigate]);

  const handleChoosePackage = (pkg) => {
    navigate("/make-payment", {
      state: {
        packageType: pkg.name,
        amount: pkg.price,
        duration: pkg.duration,
        benefits: pkg.benefits,
      },
    });
  };

  return (
    <div className="container py-5 text-light">
      <h2 className="text-center mb-4">Membership Packages</h2>
      <div className="row justify-content-center">
        {packages.map((pkg, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card bg-dark text-light h-100 shadow-lg border border-secondary">
              <div className="card-body d-flex flex-column">
                <h4 className="card-title text-center text-info">{pkg.name}</h4>
                <h6 className="text-center mb-3 text-muted">{pkg.duration}</h6>
                <h5 className="text-center text-success mb-4">LKR {pkg.price.toLocaleString()}</h5>

                <ul className="list-unstyled">
                  {pkg.benefits.map((benefit, idx) => (
                    <li key={idx} className="mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="text-center mt-auto">
                  <button
                    className="btn btn-outline-light mt-3 w-100"
                    onClick={() => handleChoosePackage(pkg)}
                  >
                    Choose {pkg.name}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
