import axios from "axios";
import { InvestorFormData } from "../interfaces/InvestorFormData";

const API_URL = "http://localhost:8080/api/investment";

const authHeader = () => {
  const token = sessionStorage.getItem("token");
  return { Authorization: token ? `Bearer ${token}` : "", };
};

export const submitInvestorForm = async (
    formData: InvestorFormData,
    userId: string,
    navigate: (path: string) => void
  ): Promise<void> => {
    const data = new FormData();
    data.append(
      "investment",
      JSON.stringify({
        userId: userId,
        investorName: formData.investorName,
        investorJob: formData.investorJob,
        investorInterest: formData.investorInterest,
        otherDetails: formData.otherDetails,
        budgetLimit: formData.budgetLimit,
        address: formData.address,
        telNumber: formData.telNumber,
      })
    );
  
    if (formData.imageFile) {
      data.append("imageFile", formData.imageFile);
    }
  
    try {
      await axios.post(`${API_URL}/add`, data, {
        headers: { "Content-Type": "multipart/form-data", ...authHeader() },
      });
      navigate("/login");
    } catch (error) {
      console.error("Error submitting data", error);
      alert("Failed to submit investor data.");
    }
};

export const getAllInvesters = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAllInvestors`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error("Error fetching enterprises:", error);
    return [];
  }
};

export const getInvestorById = async (investorId: string) => {
  try {
    const response = await axios.get(`${API_URL}/getInvestmentByInvestmentId/${investorId}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error("Error fetching investors:", error);
    return [];
  }
};

export const getInvestorCount = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAllInvestors`, { headers: authHeader() });
    return response.data.length;
  } catch (error) {
    console.error("Error fetching investors:", error);
    return 0;
  }
};

export const deleteInvester = async (id: string) => {
  const response = await axios.delete(`${API_URL}/deleteInvestment/${id}`, { headers: authHeader() });
  return response.data;
};

export const updateInvestorProfile = async (investorId: string,formData: InvestorFormData): Promise<void> => {
  const data = new FormData();
  data.append(
    "investment",
    JSON.stringify({
      investorName: formData.investorName,
      investorJob: formData.investorJob,
      investorInterest: formData.investorInterest,
      otherDetails: formData.otherDetails,
      budgetLimit: formData.budgetLimit,
      address: formData.address,
      telNumber: formData.telNumber,
    })
  );

  if (formData.imageFile) {
    data.append("imageFile", formData.imageFile);
  }

  try {
    await axios.put(`${API_URL}/updateInvestment/${investorId}`, data, {
      headers: { "Content-Type": "multipart/form-data", ...authHeader() },
    });
    alert("Investor profile updated successfully!");
  } catch (error) {
    console.error("Error updating investor profile", error);
    alert("Failed to update investor profile.");
  }
};

export const getInvestmentByUserId = async () => {
  try {
    const response = await axios.get(`${API_URL}/getInvestmentByUserId/${sessionStorage.getItem("userId")}`, { headers: authHeader() });
    return response.data ? true : false;
  } catch (error) {
    console.error("Error fetching enterprise data:", error);
    return false;
  }
};

export const getInvByUserId = async () => {
  try {
    const response = await axios.get(`${API_URL}/getInvestmentByUserId/${sessionStorage.getItem("userId")}`, { headers: authHeader() });
    return response.data?.investmentId || null; 
  } catch (error) {
    console.error("Error fetching enterprise data:", error);
    return false;
  }
};
