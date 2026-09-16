import axios from 'axios';

// Base Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Response interceptor for consistent error messaging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Extract a clear error message from server response if present
    const serverMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          (error.response?.data?.errors ? error.response.data.errors.map(e => e.msg).join(', ') : null) ||
                          error.message ||
                          'Network error. Please make sure the backend server is running.';
    
    // Attach user-friendly message to error object
    error.customMessage = serverMessage;
    return Promise.reject(error);
  }
);

// Portfolio API functions
export const portfolioApi = {
  // POST /api/portfolio
  create: async (portfolioData) => {
    const response = await api.post('/portfolio', portfolioData);
    return response.data;
  },

  // GET /api/portfolio/:username
  getByUsername: async (username) => {
    const response = await api.get(`/portfolio/${username}`);
    return response.data;
  },

  // PUT /api/portfolio/:username
  update: async (username, portfolioData) => {
    const response = await api.put(`/portfolio/${username}`, portfolioData);
    return response.data;
  },

  // DELETE /api/portfolio/:username
  delete: async (username) => {
    const response = await api.delete(`/portfolio/${username}`);
    return response.data;
  },
};

export default api;
