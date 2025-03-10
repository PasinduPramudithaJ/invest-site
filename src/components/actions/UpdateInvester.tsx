import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import cmplogo from "../assets/logo1.png";
import "../styles/Invesform.css";

const UpdateInvester: React.FC = () => {
  const navigate = useNavigate();
  const { investorId } = useParams<{ investorId: string }>();
  
  const [formData, setFormData] = useState({
    investorName: "",
    investorJob: "",
    investorInterest: "",
    otherDetails: "",
    budgetLimit: "",
    address: "",
    telNumber: "",
    imageFile: null as File | null,
  });

  useEffect(() => {
    const fetchInvestor = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/investment/getInvestmentByInvestmentId/${investorId}`);
        if (response.data) {
          setFormData(response.data);
        }
      } catch (error) {
        console.error("Error fetching investor details", error);
      }
    };
    fetchInvestor();
  }, [investorId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/investment/updateInvestment/${investorId}`, formData);
      navigate("/investors"); // Redirect after update
    } catch (error) {
      console.error("Error updating investor details", error);
    }
  };

  return (
    <>
      <Header />
      <div className="invesform">
        <div className="invesform-container">
          <div className="cmp-logo">
            <img src={cmplogo} alt="Company Logo" />
          </div>
          <div className="invesform-box">
            <form onSubmit={handleSubmit}>
              <h1>Update Investor</h1>
              <div className="mb-3">
                <label className="form-label">Investor Name</label>
                <input type="text" className="form-control" name="investorName" value={formData.investorName} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Investor Job</label>
                <input type="text" className="form-control" name="investorJob" value={formData.investorJob} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Investor Interest</label>
                <input className="form-control" name="investorInterest" value={formData.investorInterest} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Other Details</label>
                <input className="form-control" name="otherDetails" value={formData.otherDetails} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Budget Limit</label>
                <input type="text" className="form-control" name="budgetLimit" value={formData.budgetLimit} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input className="form-control" name="address" value={formData.address} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Telephone Number</label>
                <input type="text" className="form-control" name="telNumber" value={formData.telNumber} onChange={handleChange} required />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary w-100">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdateInvester;
