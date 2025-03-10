import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InvestorFormData } from "../../../interfaces/InvestorFormData";
import { getInvestorById } from "../../../services/InvesterService";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";


const InvsProfile: React.FC = () => {
    const [investor, setInvestor] = useState<InvestorFormData | null>(null);
    const { investorId } = useParams<{ investorId: string }>();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loggedUser, setLoggedUser] = useState({
      firstName: "",
      lastName: "",
      userId: "",
      email: ""
    });
  

  useEffect(() => {
    const fetchInvestor = async () => {
      if (investorId) {
        const data = await getInvestorById(investorId);
        setInvestor(data);
      } else {
        console.error("Investor ID is undefined");
      }
    };
    fetchInvestor();
  }, [investorId]);


  useEffect(() => {
    // Simulating fetching logged-in user data from session storage
    const userData = {
      firstName: sessionStorage.getItem("firstName") || "John",
      lastName: sessionStorage.getItem("lastName") || "Doe",
      userId: sessionStorage.getItem("userId") || "12345",
      email: sessionStorage.getItem("userEmail") || "johndoe@example.com"
    };
    setLoggedUser(userData);
  }, []);

  if (!investor) {
    return <div className="text-center mt-5">Loading investor details...</div>;
  }

  return (
    <div className="main-content">
      
      <Header />
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(https://img.freepik.com/premium-photo/abstract-image-digital-handshake-representing-connection-partnership-business-context_955712-37083.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <span className="mask bg-gradient-default opacity-8"></span>
        <div className="container-fluid d-flex align-items-center mx-5">
          <div className="row">
            <div className="col-lg-7 col-md-10">
              <h1 className="display-2 text-white">{investor.investorName}</h1>
              <p className="text-white mt-0 mb-5">Welcome to the Investor Profile Page</p>
              <a href={`/updateInvester/${investor.investmentId}`} className="btn btn-info">Edit Profile</a>
            </div>
          </div>
        </div>
      </div>
      {/* Page Content */}
      <div className="container-fluid mt--7">
        <div className="row">
          <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0 mt-5">
            <div className="card card-profile shadow">
              <div className="card-body text-center">
                {investor.imageFile && (
                  <img
                    src={`data:${investor.contentType};base64,${investor.imageFile}`}
                    className="card-img-top rounded"
                    alt={investor.imageName}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <h3 className="mt-3">{investor.investorName}</h3>
                <p className="text-muted">{investor.investorJob}</p>
                <p>{investor.address}</p>
                <button className="btn btn-info" onClick={() => setIsPopupOpen(true)}>Connect</button>
              </div>
            </div>
          </div>
          <div className="col-xl-8 order-xl-1 mb-5 mt-5">
            <div className="card bg-white shadow p-4">
              <div className="card-header bg-white border-0">
                <h3 className="mb-0">Investor Details</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Job:</strong> {investor.investorJob}</p>
                    <p><strong>Interests:</strong> {investor.investorInterest}</p>
                    <p><strong>Budget Limit:</strong> {investor.budgetLimit}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Address:</strong> {investor.address}</p>
                    <p><strong>Phone:</strong> {investor.telNumber}</p>
                    <p><strong>Other Details:</strong> {investor.otherDetails}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isPopupOpen && (
  <div className="modal fade show d-block p-5" role="dialog" style={{margin:"300px 10px"}}>
    <div className="modal-body">
          <div className="card p-3 border-0">
            <div className="card-body">
              <p><strong>First Name:</strong> {loggedUser.firstName}</p>
              <p><strong>Last Name:</strong> {loggedUser.lastName}</p>
              <p><strong>User ID:</strong> {loggedUser.userId}</p>
              <p><strong>Email:</strong> {loggedUser.email}</p>
              <p><strong>Investor ID:</strong> {investorId}</p>
            </div>
          </div>
        </div>
        <div className="modal-footer d-flex justify-content-center gap-3">
    </div>
  </div>
)}
      <Footer />
    </div>
  );
};

export default InvsProfile;