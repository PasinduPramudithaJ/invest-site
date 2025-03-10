import axios from 'axios';

const API_URL = 'http://localhost:8080/api/user';

interface ErrorResponse {
  message?: string;
}

const authHeader = (): { Authorization: string } | undefined => {
  const token = sessionStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : undefined;
};

export const register = async (user: { userEmail: string; firstName: string; lastName: string; password: string; }): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/signup`, user);
    if(response.data === "User already registered as a user"){
      alert("User already registered as a user");
      return "Registered";
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorData = error.response.data as ErrorResponse;
      throw errorData.message || 'Error during registration';
    } else {
      throw 'Error during registration';
    }
  }
};

export const login = async (credentials: { userEmail: string; password: string }): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/signing`, credentials);
    const { token, userEmail, firstName, userId, userRole } = response.data;
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userEmail', userEmail);
    sessionStorage.setItem('firstName', firstName);
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('role', userRole);
    return userRole;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorData = error.response.data as ErrorResponse;
      throw errorData.message || 'Error during login';
    } else {
      throw 'Error during login';
    }
  }
};

export const logout = (): void => {
  sessionStorage.clear();
  window.location.href = '/login';
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserCount = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`, { headers: authHeader() });
    return response.data.length;
  } catch (error) {
    console.error('Error fetching users:', error);
    return 0;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const passwordRecovery = async (userEmail: string) => {
  try {
    const response = await axios.post(`${API_URL}/sendVerificationCode`, { userEmail }, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error('Error sending verification code:', error);
    throw error;
  }
};

export const updatePassword = async (userEmail: string, newPassword: string) => {
  try {
    const response = await axios.post(`${API_URL}/updatePassword`, null, {
      params: { userEmail, newPassword },
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const response = await axios.get(`${API_URL}/getUserByEmail/${email}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};