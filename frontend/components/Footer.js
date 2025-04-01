import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-2 mt-5">
      <Container>
        <div className="row">
          {/* Brand Info */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">FitVana</h5>
            <p>Your ultimate destination for personal training & fitness bookings. Train smart. Live strong.</p>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Contact Us</h6>
            <p className="mb-1"><FaPhoneAlt className="me-2" /> +94 77 123 4567</p>
            <p><FaEnvelope className="me-2" /> support@fitvana.com</p>
          </div>

          {/* Social Links */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Follow Us</h6>
            <div className="d-flex justify-content-center gap-3 fs-5">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-top border-light mt-4" />
        <div className="text-center small">
          © {new Date().getFullYear()} FitVana. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
