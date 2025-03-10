import axios from "axios";
const API_URL = "http://localhost:8080/api/funding";

const authHeader = () => {
  const token = sessionStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : { Authorization: "" };
};

export const addProject = async (projectData: {
    projectName: string;
    description: string;
    targetAmount: string;
    currentAmount: string;
    projectOwnerId: string;
}) => {
    try {
      const response = await axios.post(`${API_URL}/add`, projectData, { headers: authHeader() });
  
      if (!response) {
        throw new Error("Failed to add project");
      }
  
      return response.data;
    } catch (error) {
      console.error("Error adding project:", error);
      throw error;
    }
};

export const getAllFunds = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAll`, { headers: authHeader() });
    const funds = response.data;
    const publishedFunds = funds.filter((fund: { status: string }) => fund.status === 'published');
    return publishedFunds;
  } catch (error) {
    console.error("Error fetching enterprises:", error);
    return [];
  }
};

export const getFullFundList = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAll`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error("Error fetching enterprises:", error);
    return [];
  }
};

export const publishProject = async (projectId: string): Promise<void> => {
  try {
    await axios.put(`${API_URL}/publish/${projectId}`, {}, { headers: authHeader() });
    console.log("Project published successfully");
  } catch (error) {
    console.error("Error publishing project:", error);
    throw error;
  }
};

export const getFundCount = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAll`, { headers: authHeader() });
    return response.data.length;
  } catch (error) {
    console.error("Error fetching funds:", error);
    return 0;
  }
};
