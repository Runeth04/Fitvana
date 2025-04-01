import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignIn from "./pages/SIgnIn";
import UserProfile from "./pages/User/UserProfile";
import UpdateProfile from "./pages/User/UpdateProfile";
import SideBar from "./components/SideBar";
import ViewAllTrainers from "./pages/Trainer/ViewAllTrainers";
import AddTrainer from "./pages/Trainer/AddTrainer";
import UpdateTrainer from "./pages/Trainer/UpdateTrainer";
import CreateReservation from "./pages/Reservations/CreateReservation";
import ViewAllReservations from "./pages/Reservations/ViewAllReservations";
import UpdateReservation from "./pages/Reservations/UpdateReservation";
import MyReservations from "./pages/Reservations/MyReservations";
import ManagePayments from "./pages/Payment/ManagePayments";
import UpdatePayment from "./pages/Payment/UpdatePayment";
import ManageFeedbacks from "./pages/Feedback/ManageFeedbacks";
import UpdateFeedback from "./pages/Feedback/UpdateFeedback";
import ManageUsers from "./pages/User/ManageUsers";
import ManageInventory from "./pages/Inventory/ManageInventory";
import AddInventoryItem from "./pages/Inventory/AddInventoryItem";
import UpdateInventoryItem from "./pages/Inventory/UpdateInventoryItem";
import PackageDetails from "./pages/Payment/PackageDetails";
import PackagePaymentPage from "./pages/Payment/MakePayment";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/packages" element={<PackageDetails />} />
          <Route path="/edit-profile" element={<UpdateProfile />} />
          <Route path="/make-reservation" element={<CreateReservation />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
          <Route path="/my-reservations" element={<MyReservations />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/make-payment" element={<PackagePaymentPage/>} />
          <Route
            path="/admin-dashboard"
            element={
              <div className="row">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  <ViewAllTrainers />
                </div>
              </div>
            }
          />
          <Route
            path="/addTrainer"
            element={
              <div className="row">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  <AddTrainer />
                </div>
              </div>
            }
          />
          <Route
            path="/updateTrainer/:trainerId"
            element={
              <div className="row">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  <UpdateTrainer />
                </div>
              </div>
            }
          />
          <Route
            path="/inventory"
            element={
              <div className="row">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  <ManageInventory/>
                </div>
              </div>
            }
          />
          <Route
            path="/add-inventory"
            element={
              <div className="row">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  <AddInventoryItem/>
                </div>
              </div>
            }
          />
          <Route
            path="/update-inventory/:id"
            element={
              <div className="row">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  <UpdateInventoryItem/>
                </div>
              </div>
            }
          />
          <Route
            path="/all-reservations"
            element={
              <div className="row">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  <ViewAllReservations />
                </div>
              </div>
            }
          />
          <Route
            path="/update-reservation/:id"
            element={
              <div className="row">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  <UpdateReservation />
                </div>
              </div>
            }
          />
          <Route
            path="/manage-payments"
            element={
              <div className="row">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  <ManagePayments/>
                </div>
              </div>
            }
          />
          <Route
            path="/update-payment/:id"
            element={
              <div className="row">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  <UpdatePayment/>
                </div>
              </div>
            }
          />
          <Route
            path="/manage-feedbacks"
            element={
              <div className="row">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  <ManageFeedbacks/>
                </div>
              </div>
            }
          />
          <Route
            path="/update-feedback/:id"
            element={
              <div className="row">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  <UpdateFeedback/>
                </div>
              </div>
            }
          />
          <Route
            path="manage-users"
            element={
              <div className="row">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  <ManageUsers/>
                </div>
              </div>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
