import React, { useState } from "react";
import { addProject } from "../../services/Funding";
import { useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import cmplogo from "../assets/logo1.png";
import "../styles/FundingForm.css";

const FundingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    targetAmount: "",
    currentAmount: "",
    projectOwnerId: "",
    actNumber: "",
    actName: "",
    branch: "",
    bank: "",
  });

  const [loading, setLoading] = useState(false);
  const [, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "targetAmount" || name === "currentAmount"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await addProject(formData);
      navigate("/fundList");
    } catch (error) {
      alert("Failed to add project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header />
    <div className="fundingform">
      <div className="fundingform-container">

        <div className="cmp-logo">
          <img src={cmplogo} alt="Company Logo" />
        </div>

        <div className="fundingform-box">
      <form onSubmit={handleSubmit}>
        <h1 >Funding Form</h1>

          <div className="mb-3">
            <label className="form-label">Project Name</label>
            <input
              type="text"
              className="form-control"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Target Amount</label>
            <input
              type="number"
              className="form-control"
              name="targetAmount"
              value={formData.targetAmount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Account Number</label>
            <input
              type="number"
              className="form-control"
              name="actNumber"
              value={formData.actNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Account Holder Name</label>
            <input
              type="text"
              className="form-control"
              name="actName"
              value={formData.actName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Bank</label>
            <select
              id="bankSelect"
              className="form-control"
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              required
            >
              <option value="">Select a Bank</option>
              <option value="BOC">Bank of Ceylon</option>
              <option value="NSB">National Savings Bank (NSB)</option>
              <option value="Sampath">Sampath Bank</option>
              <option value="PeoplesBank">Peoples Bank</option>
              <option value="HSBC">HSBC Sri Lanka</option>
              <option value="CommercialBank">Commercial Bank of Ceylon</option>
              <option value="DFCC">DFCC Bank</option>
              <option value="HNB">Hatton National Bank (HNB)</option>
              <option value="UnionBank">Union Bank of Colombo</option>
              <option value="NTB">Nations Trust Bank (NTB)</option>
              <option value="CitiBank">Citibank N.A.</option>
              <option value="LOL">LOLC Finance</option>
              <option value="Shri">Shri Lanka Insurance</option>
              <option value="LBFinance">LB Finance</option>
              <option value="PanAsia">Pan Asia Banking Corporation</option>
              <option value="NTC">National Trust Bank</option>
              <option value="Cargills">Cargills Bank</option>
              <option value="SriLankaBank">Sri Lanka Savings Bank</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Branch</label>
            <select
              id="districtSelect"
              className="form-control"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            >
              <option value="">Select a District</option>
              <option value="Colombo">Colombo</option>
              <option value="Colombo_Colombo">Colombo (Main City)</option>
              <option value="Colombo_Kotte">Kotte</option>
              <option value="Gampaha">Gampaha</option>
              <option value="Gampaha_Negombo">Negombo</option>
              <option value="Gampaha_Katunayake">Katunayake</option>
              <option value="Kandy">Kandy</option>
              <option value="Kandy_Kandy">Kandy (Main City)</option>
              <option value="Kandy_Mahiyangana">Mahiyangana</option>
              <option value="Matara">Matara</option>
              <option value="Matara_Matara">Matara (Main City)</option>
              <option value="Matara_Hambantota">Hambantota</option>
              <option value="Jaffna">Jaffna</option>
              <option value="Jaffna_Jaffna">Jaffna (Main City)</option>
              <option value="Jaffna_Kankesanthurai">Kankesanthurai</option>
              <option value="Anuradhapura">Anuradhapura</option>
              <option value="Anuradhapura_Anuradhapura">
                Anuradhapura (Main City)
              </option>
              <option value="Anuradhapura_Tikiri">Tikiri</option>
              <option value="Kurunegala">Kurunegala</option>
              <option value="Kurunegala_Kurunegala">
                Kurunegala (Main City)
              </option>
              <option value="Kurunegala_Malwana">Malwana</option>
              <option value="Badulla">Badulla</option>
              <option value="Badulla_Badulla">Badulla (Main City)</option>
              <option value="Badulla_Haputale">Haputale</option>
              <option value="Kegalle">Kegalle</option>
              <option value="Kegalle_Kegalle">Kegalle (Main City)</option>
              <option value="Kegalle_Mawanella">Mawanella</option>
              <option value="NuwaraEliya">Nuwara Eliya</option>
              <option value="NuwaraEliya_NuwaraEliya">
                Nuwara Eliya (Main City)
              </option>
              <option value="NuwaraEliya_Gampola">Gampola</option>
              <option value="Puttalam">Puttalam</option>
              <option value="Puttalam_Puttalam">Puttalam (Main City)</option>
              <option value="Puttalam_NorthWestern">North Western</option>
              <option value="Vavuniya">Vavuniya</option>
              <option value="Vavuniya_Vavuniya">Vavuniya (Main City)</option>
              <option value="Vavuniya_Nandikadal">Nandikadal</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Project"}
          </button>
        </form>
      </div>
    </div>
    </div>
    <Footer />
  </>
  );
};

export default FundingForm;
