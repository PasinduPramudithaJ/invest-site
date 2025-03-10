import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EnterpriseFormData } from "../../interfaces/EnterpriseFormData";
import { submitEnterpriseForm } from "../../services/EnterpriceService";
import "../styles/Entreform.css";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import cmplogo from "../assets/logo1.png";

const EnterpriseForm: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<EnterpriseFormData>({
    userId: userId || "",
    enterpriseId: "",
    enterpriseName: "",
    enterpriseEmail: "",
    registerNumber: "",
    enterpriseType: "",
    startingDate: "",
    address: "",
    city: "",
    telNumber: "",
    webUrl: "",
    imageFile: null as File | null,
    imageName: "",
    contentType: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, imageFile: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        await submitEnterpriseForm(formData, userId, navigate);
      } else {
        alert("User ID is missing!");
      }
    }
  };

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    let tempErrors: { [key: string]: string } = {};
    if (!formData.enterpriseName) tempErrors.enterpriseName = "Enterprise Name is required";
    if (!formData.enterpriseEmail) {
      tempErrors.enterpriseEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.enterpriseEmail)) {
      tempErrors.enterpriseEmail = "Invalid email format";
    }
    if (!formData.registerNumber) tempErrors.registerNumber = "Register Number is required";
    if (!formData.enterpriseType) tempErrors.enterpriseType = "Enterprise Type is required";
    if (!formData.startingDate) tempErrors.startingDate = "Starting Date is required";
    if (!formData.address) tempErrors.address = "Address is required";
    if (!formData.city) tempErrors.city = "City is required";
    if (!formData.telNumber) {
      tempErrors.telNumber = "Telephone Number is required";
    }if (!/^0\d{9}$/.test(formData.telNumber)) {
    alert("Invalid telephone number. Must be 10 digits starting with 0");
    return false;
    }
    if (!formData.webUrl) tempErrors.webUrl = "Website URL is required";
    if (!formData.imageFile) tempErrors.imageFile = "Image upload is required";
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
      <form onSubmit={handleSubmit}>
        <h1 >Entrepreneur Form</h1>


        <div className="mb-3">
          <label className="form-label">Enterprise Name</label>
          <input type="text" className="form-control" name="enterpriseName" value={formData.enterpriseName} onChange={handleChange} required />
          {errors.enterpriseName && <div className="text-danger">{errors.enterpriseName}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Enterprise Email</label>
          <input type="email" className="form-control" name="enterpriseEmail" value={formData.enterpriseEmail} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Register Number</label>
          <input type="text" className="form-control" name="registerNumber" value={formData.registerNumber} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Enterprise Type</label>
          <input type="text" className="form-control" name="enterpriseType" value={formData.enterpriseType} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Starting Date</label>
          <input type="date" className="form-control" name="startingDate" value={formData.startingDate} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">City</label>
          <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Telephone Number</label>
          <input type="text" className="form-control" name="telNumber" value={formData.telNumber} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Website URL</label>
          <input type="text" className="form-control" name="webUrl" value={formData.webUrl} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input type="file" className="form-control" onChange={handleFileChange} required />
        </div>

        <div className="text-center">
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

export default EnterpriseForm;
