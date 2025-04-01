import React from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div
      className="bg-dark text-light p-4 d-flex flex-column gap-3 shadow"
      style={{ minHeight: "100vh", width: "240px" }}
    >
      <h5 className="text-center mb-3 border-bottom pb-2">Admin Panel</h5>

      <Link
        to="/admin-dashboard"
        className="btn btn-outline-light text-start w-100"
      >
        Manage Trainers
      </Link>
      <Link
        to="/manage-users"
        className="btn btn-outline-light text-start w-100"
      >
        Manage Users
      </Link>
      <Link
        to="/all-reservations"
        className="btn btn-outline-light text-start w-100"
      >
        Manage Reservations
      </Link>
      <Link
        to="/manage-payments"
        className="btn btn-outline-light text-start w-100"
      >
        Manage Payments
      </Link>
      <Link
        to="/manage-feedbacks"
        className="btn btn-outline-light text-start w-100"
      >
        Manage Feedbacks
      </Link>
      <Link
        to="/inventory"
        className="btn btn-outline-light text-start w-100"
      >
        Manage Inventory
      </Link>
    </div>
  );
}
