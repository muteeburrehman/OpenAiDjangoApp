// services/api.js
const API_BASE_URL = 'http://localhost:8000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  console.log("🔹 Auth Token:", token ? "Token Present ✅" : "No Token ❌");
  return token ? { 'Authorization': `Token ${token}` } : {};
};

const handleResponse = async (response) => {
  console.log(`🔹 Response Status: ${response.status}`);

  if (!response.ok) {
    let errorMessage = 'An error occurred';
    if (response.status === 401) errorMessage = 'Authentication required';
    if (response.status === 403) errorMessage = 'Permission denied';
    if (response.status === 404) errorMessage = 'Resource not found';
    if (response.status === 500) errorMessage = 'Server error occurred';

    const errorData = await response.json().catch(() => null);
    console.error("❌ API Error:", {
      status: response.status,
      message: errorMessage,
      serverResponse: errorData
    });
    throw { 
      status: response.status, 
      message: errorMessage, 
      serverMessage: errorData 
    };
  }

  // Directly return parsed JSON
  return response.json();
};

const api = {
  get: async (url) => {
    console.log(`➡️ [GET] ${API_BASE_URL}${url}`);
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...getAuthHeaders(),
      },
      credentials: 'omit',
    });
    return handleResponse(response);
  },

  post: async (url, body) => {
    console.log(`➡️ [POST] ${API_BASE_URL}${url}`, "\n📦 Payload:", body);
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(body),
      credentials: 'omit',
    });
    return handleResponse(response);
  },

  put: async (url, body) => {
    console.log(`➡️ [PUT] ${API_BASE_URL}${url}`, "\n📦 Payload:", body);
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(body),
      credentials: 'omit',
    });
    return handleResponse(response);
  },

  delete: async (url) => {
    console.log(`➡️ [DELETE] ${API_BASE_URL}${url}`);
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...getAuthHeaders(),
      },
      credentials: 'omit',
    });
    return handleResponse(response);
  },
};

export const endpoints = {
  login: '/tokens/',
  register: '/users/',
  codeExplain: '/code-explain/',
};

export default api;