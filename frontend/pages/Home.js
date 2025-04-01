import React from "react";
import Navbar from "../components/Navbar";
import c1 from "../images/hero1.jpg";
import c2 from "../images/hero2.jpg";
import c3 from "../images/hero3.jpg";
import c4 from "../images/hero4.jpg";
import c5 from "../images/aboutus.jpg";
import { Carousel } from "react-bootstrap";
import Footer from "../components/Footer";
import FeedbackForm from "./Feedback/FeedbackForm";

const Home = () => {
  return (
    <div>
      <div className="container-fluid px-0">
        <Carousel fade interval={3000}>
          <Carousel.Item>
            <img
              className="d-block w-100 img-fluid object-fit-cover"
              style={{ height: "500px", objectFit: "cover" }}
              src={c1}
              alt="Slide 1"
            />
            <Carousel.Caption>
              <h3>Welcome to Your Fitness Journey</h3>
              <p>Track. Train. Transform.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 img-fluid object-fit-cover"
              style={{ height: "500px", objectFit: "cover" }}
              src={c2}
              alt="Slide 2"
            />
            <Carousel.Caption>
              <h3>Smart Gym Management</h3>
              <p>Manage trainers, bookings, and growth easily.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 img-fluid object-fit-cover"
              style={{ height: "500px", objectFit: "cover" }}
              src={c3}
              alt="Slide 3"
            />
            <Carousel.Caption>
              <h3>Elevate Member Experience</h3>
              <p>
                Personalized schedules & reminders that keep users coming back.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 img-fluid object-fit-cover"
              style={{ height: "500px", objectFit: "cover" }}
              src={c4}
              alt="Slide 4"
            />
            <Carousel.Caption>
              <h3>All-in-One Gym Solution</h3>
              <p>Streamline everything from one dashboard.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="container mt-5">
        <div class="about">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-5">
                <div class="titlepage mt-5 py-5">
                  <h2>About Us</h2>
                  <p>
                    At Fitvana, we’re redefining the way fitness centers
                    operate. Designed with both gym owners and members in mind,
                    Fitvana blends modern technology with the passion for
                    wellness. Our platform simplifies everything — from trainer
                    scheduling and member check-ins to personalized progress
                    tracking and seamless bookings. Fitvana is more than just
                    management software — it’s a digital partner in your fitness
                    journey. Whether you’re running a boutique gym or a
                    multi-location franchise, our system adapts to your unique
                    needs. Experience streamlined operations, smart insights,
                    and an elevated member experience — all in one place.
                    Welcome to Fitvana, where fitness meets innovation, and
                    every rep is one step closer to your goals.
                  </p>
                </div>
              </div>
              <div class="col-md-7">
                <div class="about_img">
                  <figure>
                    <img src={c5} className="img-fluid h-100 rounded" alt="#" />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FeedbackForm />
      <div></div>
    </div>
  );
};

export default Home;
