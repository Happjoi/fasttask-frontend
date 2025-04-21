const API_BASE = 'http://localhost:7000/api';

export const api = {
  login: (data) => axios.post(`${API_BASE}/auth/login`, data),
  register: (data) => axios.post(`${API_BASE}/auth/register`, data),
  getTasks: (token) => axios.get(`${API_BASE}/tasks`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  createTask: (token, data) => axios.post(`${API_BASE}/tasks`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  updateTask: (token, id, data) => axios.put(`${API_BASE}/tasks/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  deleteTask: (token, id) => axios.delete(`${API_BASE}/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
};
