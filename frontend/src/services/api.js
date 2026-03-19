import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Helper to set the token globally
let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
};

// Add interceptor to include token in every request
api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

/**
 * File API
 */
export const fetchFiles = (params = {}) => api.get('/files', { params });
export const fetchSharedWithMe = () => api.get('/shares/me');
export const uploadFile = (formData) => api.post('/files/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteFile = (id) => api.delete(`/files/${id}`);
export const toggleStar = (id) => api.put(`/files/${id}/star`);
export const toggleTrash = (id) => api.put(`/files/${id}/trash`);
export const renameFile = (id, name) => api.put(`/files/${id}/rename`, { name });
export const getFileInfo = (id) => api.get(`/files/${id}/info`);
export const getStats = () => api.get('/files/stats');

/**
 * Folder API
 */
export const fetchFolderContents = (id = 'root') => api.get(`/folders/${id}`);
export const createFolder = (data) => api.post('/folders', data);
export const renameFolder = (id, data) => api.put(`/folders/${id}`, data);
export const deleteFolder = (id) => api.delete(`/folders/${id}`);

/**
 * Share API
 */
export const shareItem = (data) => api.post('/shares', data);

export default api;
