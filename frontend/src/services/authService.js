// services/authService.js
import api, { endpoints } from './api';

export const register = async (username, email, password) => {
  try {
    const response = await api.post(endpoints.register, { username, email, password });
    return response.data;
  } catch (error) {
    const serverError = error.response?.data || {};
    throw new Error(
      serverError.username?.[0] ||
      serverError.email?.[0] ||
      serverError.password?.[0] ||
      error.message || 'Registration failed'
    );
  }
};

export const login = async (username, password) => {
  try {
    console.log("🚀 Sending login request to API:", { username, password });

    const response = await api.post(endpoints.login, { username, password });

    console.log("✅ API Response:", response);

    if (!response || !response.token) {
      throw new Error("Invalid API response: No token received");
    }

    localStorage.setItem('authToken', response.token);
    return response.token;
  } catch (error) {
    console.error("❌ Login error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.detail || "Login failed");
  }
};

export const logout = () => {
  localStorage.removeItem('authToken');
};

export const getToken = () => localStorage.getItem('authToken');

export const isAuthenticated = () => !!getToken();