import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { EnterpriseFormData } from "../interfaces/EnterpriseFormData";

const API_URL = "http://localhost:8080/api/enterprise";

const authHeader = () => {
  const token = sessionStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : { Authorization: "" };
};

export const submitEnterpriseForm = async (
  formData: EnterpriseFormData,
  userId: string,
  navigate: NavigateFunction
) => {
  try {
    const data = new FormData();

    data.append(
      "enterprise",
      JSON.stringify({
        userId: userId,
        enterpriseName: formData.enterpriseName,
        enterpriseEmail: formData.enterpriseEmail,
        registerNumber: formData.registerNumber,
        enterpriseType: formData.enterpriseType,
        startingDate: formData.startingDate,
        address: formData.address,
        city: formData.city,
        telNumber: formData.telNumber,
        webUrl: formData.webUrl,
      })
    );

    if (formData.imageFile) {
      data.append("imageFile", formData.imageFile);
    }

    await axios.post(`${API_URL}/add`, data, {
      headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
    });

    alert("Enterprise details added successfully!");
    navigate("/login");
  } catch (error) {
    console.error("Error submitting enterprise form:", error);
    alert("Failed to add enterprise details.");
  }
};

export const getAllEnterprises = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAll`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error("Error fetching enterprises:", error);
    return [];
  }
};

export const getEnterpriseById = async (enterpriseId: string) => {
  try {
    const response = await axios.get(`${API_URL}/getEnterpriseById/${enterpriseId}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error("Error fetching enterprise:", error);
    return null;
  }
};

export const getEnterpriseCount = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAll`, { headers: authHeader() });
    return response.data.length;
  } catch (error) {
    console.error("Error fetching enterprises:", error);
    return 0;
  }
};

export const deleteNotification = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/deleteEnterprise/${id}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error("Error deleting enterprise:", error);
    throw error;
  }
};

export const updateEnterprise = async (enterpriseId: string, updatedData: any) => {
  try {
    const response = await axios.put(`${API_URL}/updateEnterprise/${enterpriseId}`, updatedData, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error("Error updating enterprise:", error);
    return null;
  }
};

export const getEnterpriseByUserId = async () => {
  try {
    const response = await axios.get(`${API_URL}/getEnterpriseByUserId/${sessionStorage.getItem("userId")}`, { headers: authHeader() });
    return response.data ? true : false;
  } catch (error) {
    console.error("Error fetching enterprise data:", error);
    return false;
  }
};

export const getEntpBYUserId = async () => {
  try {
    const userId = sessionStorage.getItem("userId");
    const response = await axios.get(`${API_URL}/getEnterpriseByUserId/${userId}`, { headers: authHeader() });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching enterprise by user ID:", error);
    return null;
  }
};
