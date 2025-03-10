import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitInvestorForm } from "../../services/InvesterService";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import "../styles/Entreform.css"; // Using the same CSS for styling consistency
import cmplogo from "../assets/logo1.png";

const Investorform: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    investorName: "",
    investorJob: "",
    investorInterest: "",
    otherDetails: "",
    budgetLimit: "",
    address: "",
    telNumber: "",
    imageFile: null as File | null,
    userId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, imageFile: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      const updatedFormData = {
        ...formData,
        userId,
        investmentId: "",
        investorId: "",
        imageName: formData.imageFile ? formData.imageFile.name : "",
        contentType: formData.imageFile ? formData.imageFile.type : "",
      };
      await submitInvestorForm(updatedFormData, userId, navigate);
    } else {
      console.error("User ID is null");
    }
  };

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.investorName) tempErrors.investorName = "Investor Name is required";
    if (!formData.investorJob) tempErrors.investorJob = "Investor Job is required";
    if (!formData.investorInterest) tempErrors.investorInterest = "Investor Interest is required";
    if (!formData.budgetLimit) tempErrors.budgetLimit = "Budget Limit is required";
    if (!formData.address) tempErrors.address = "Address is required";
    if (!formData.telNumber) {
      tempErrors.telNumber = "Telephone Number is required";
    }if (!/^0\d{9}$/.test(formData.telNumber)) {
      alert("Telephone number must start with 0 and be exactly 10 digits");
      return false;
    }
    if (!formData.imageFile) {
      tempErrors.imageFile = "Image upload is required";
    } else if (!formData.imageFile.type.startsWith("image/")) {
      tempErrors.imageFile = "Only image files are allowed";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  return (
    <>
      <Header />
      <div className="entreform">
        <div className="entreform-container">
          <div className="cmp-logo">
            <img src={cmplogo} alt="Company Logo" />
          </div>

          <div className="entreform-box">
            <h1>Get Started Now!</h1>
            <p className="text-center">
It's easy to create a pitch using our online form. Your pitch can be in front of our investors before you know it.            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Investor Name</label>
                <input type="text" className="form-control" name="investorName" value={formData.investorName} onChange={handleChange} required />
                {errors.investorName && <small className="text-danger">{errors.investorName}</small>}
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

              <div className="mb-3">
                <label className="form-label">Upload Image</label>
                <input type="file" className="form-control" onChange={handleFileChange} required />
              </div>

              <div className="text-center">
                <p>
                  By submitting, you agree to our{" "}
                  <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
                    Terms and Conditions
                  </a>.
                </p>
                <button type="submit" className="btn btn-success w-100">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Investorform;