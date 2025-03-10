import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EnterpriseFormData } from "../../../interfaces/EnterpriseFormData";
import { getEnterpriseById } from "../../../services/EnterpriceService";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import axios from "axios";


const EntpProfile: React.FC = () => {
  const [enterprise, setEnterprise] = useState<EnterpriseFormData | null>(null);
  const { enterpriseId } = useParams<{ enterpriseId: string }>();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState({
    firstName: "",
    lastName: "",
    userId: "",
    email: ""
  });

  const handleSendEmail = async () => {
    // Retrieve sender email from session storage
    const senderEmail = sessionStorage.getItem("userEmail"); 
  
    if (!enterprise?.enterpriseEmail || !senderEmail) {
      alert("Missing sender or recipient email.");
      return;
    }
  
    // Prepare the email content
    const emailRequest = {
      recipient: enterprise.enterpriseEmail,  // Receiver's email
      sender: senderEmail,                    // Sender's email
      subject: "Enterprise Connection Request", // Email subject
      content: `
        <div>
          <p><strong>First Name:</strong> ${loggedUser.firstName}</p>
          <p><strong>User ID:</strong> ${loggedUser.userId}</p>
          <p><strong>Email:</strong> ${loggedUser.email}</p>
          <p><strong>Enterprise ID:</strong> ${enterpriseId}</p>
        </div>
      `,
    };
  
    // Retrieve the token from session storage
    const token = sessionStorage.getItem("token"); 
  
    try {
      const response = await axios.post("http://localhost:8080/api/email/email", emailRequest, {
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include Bearer token
        },
      });
  
      if (response.status === 200) {
        alert("Email sent successfully.");
        setIsPopupOpen(false);
      } else {
        alert("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred.");
    }
  };
  
  
  

  useEffect(() => {
    const fetchEnterprise = async () => {
      if (enterpriseId) {
        const data = await getEnterpriseById(enterpriseId);
        setEnterprise(data);
      } else {
        console.error("Enterprise ID is undefined");
      }
    };
    fetchEnterprise();
  }, [enterpriseId]);

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

  return (
    <div className="main-content">
      <Header />
      <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{
        minHeight: "600px",
        backgroundImage:
          "url(https://img.freepik.com/premium-photo/abstract-image-digital-handshake-representing-connection-partnership-business-context_955712-37083.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}>
        <span className="mask bg-gradient-default opacity-8"></span>
        <div className="container-fluid d-flex align-items-center mx-5">
          <div className="row">
            <div className="col-lg-7 col-md-10">
              <h1 className="display-2 text-white">{enterprise?.enterpriseName}</h1>
              <p className="text-white mt-0 mb-5">Welcome to the enterprise profile page.</p>
              {loggedUser.userId === enterprise?.userId ? (
                <a href={`/updateInvester/${enterprise?.enterpriseId}`} className="btn btn-info">Update Profile</a>
                
              ) : (
                <a href={`/enterprise`} className="btn btn-info">Back to Entreprenurs List</a>
                
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-fluid mt--7">
        {!isPopupOpen && (
          <div className="row">
          <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0 mt-5">
            <div className="card card-profile shadow">
              <div className="card-body text-center">
                {enterprise?.imageFile && (
                  <img
                    src={`data:${enterprise.contentType};base64,${enterprise.imageFile}`}
                    className="card-img-top rounded"
                    alt={enterprise.imageName}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <h3 className="mt-3">{enterprise?.enterpriseName}</h3>
                <p className="text-muted">{enterprise?.enterpriseType}</p>
                <p>{enterprise?.city}</p>
                <button className="btn btn-sm btn-info mr-4" onClick={() => setIsPopupOpen(true)}>Connect</button>
              </div>
            </div>
          </div>
          <div className="col-xl-8 order-xl-1 mb-5 mt-5">
            <div className="card bg-white shadow p-4">
              <div className="card-header bg-white border-0">
                <h3 className="mb-0">Enterprise Details</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Email:</strong> {enterprise?.enterpriseEmail}</p>
                    <p><strong>Register Number:</strong> {enterprise?.registerNumber}</p>
                    <p><strong>Enterprise Type:</strong> {enterprise?.enterpriseType}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Starting Date:</strong> {enterprise?.startingDate}</p>
                    <p><strong>Address:</strong> {enterprise?.address}, {enterprise?.city}</p>
                    <p><strong>Phone:</strong> {enterprise?.telNumber}</p>
                    <p><strong>Website:</strong> <a href={enterprise?.webUrl} target="_blank" rel="noopener noreferrer">{enterprise?.webUrl}</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        ) }
      </div>
      
      {isPopupOpen && (
  <div className="modal fade show d-block p-5" role="dialog" style={{margin:"300px 10px"}}>
    <div className="modal-body">
          <div className="card p-3 border-0">
            <div className="card-body">
              <p><strong>First Name:</strong> {loggedUser.firstName}</p>
              <p><strong>User ID:</strong> {loggedUser.userId}</p>
              <p><strong>Email:</strong> {loggedUser.email}</p>
              <p><strong>Enterprise ID:</strong> {enterpriseId}</p>
            </div>
          </div>
        </div>
        <div className="modal-footer d-flex justify-content-center gap-3">
      <button
        className="btn btn-secondary"
        style={{
          padding: "6px 15px",
          borderRadius: "5px",
          fontWeight: "bold",
          width: "100px",
        }}
        onClick={() => setIsPopupOpen(false)}
      >
        Close
      </button>
      <button
        className="btn btn-success"
        style={{
          padding: "6px 15px",
          borderRadius: "5px",
          fontWeight: "bold",
          width: "100px",
        }}
        onClick={handleSendEmail}
      >
        Connect
      </button>
    </div>
  </div>
)}
      <Footer />
    </div>
  );
};

export default EntpProfile;