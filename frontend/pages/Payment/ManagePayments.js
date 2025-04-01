import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaSearch, FaTrashAlt, FaEdit, FaFilePdf } from "react-icons/fa";

export default function ManagePayments() {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch("http://localhost:8070/payment");
      const data = await res.json();
      setPayments(data);
    } catch (err) {
      console.error("Error fetching payments:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this payment?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8070/payment/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPayments(payments.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Package Payments Report", 14, 15);
    const headers = [["NIC", "Package", "Amount (LKR)", "Method", "Status", "Date"]];
    const body = filteredPayments.map((p) => [
      p.nic,
      p.packageType,
      p.amount,
      p.paymentMethod,
      p.status,
      new Date(p.paidAt).toLocaleDateString(),
    ]);

    doc.autoTable({ head: headers, body, startY: 20 });
    doc.save("package_payments_report.pdf");
  };

  const filteredPayments = payments.filter((p) =>
    p.nic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.packageType.toLowerCase().includes(searchTerm.toLowerCase())
    // || p.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // p.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5 text-light">
      <h2 className="text-center mb-4">Manage Package Payments</h2>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-dark text-white"><FaSearch /></span>
            <input
              type="text"
              className="form-control bg-dark text-white"
              placeholder="Search by NIC, Package, or Method"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 text-end">
          <button className="btn btn-outline-light" onClick={generateReport}>
            <FaFilePdf className="me-2" /> Generate Report
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-hover text-white">
          <thead>
            <tr>
              <th>NIC</th>
              <th>Package</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Paid At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.nic}</td>
                <td>{payment.packageType}</td>
                <td>LKR {payment.amount.toLocaleString()}</td>
                <td>{payment.paymentMethod}</td>
                <td>{payment.status}</td>
                <td>{new Date(payment.paidAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-warning me-2"
                    onClick={() => navigate(`/update-payment/${payment._id}`)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(payment._id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
            {filteredPayments.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}