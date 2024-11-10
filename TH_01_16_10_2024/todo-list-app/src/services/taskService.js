import axios from 'axios';

const API_URL = 'http://localhost:3000/api/tasks';

export const fetchTasks = () => axios.get(API_URL);
export const addTask = (taskData) => axios.post(API_URL, taskData);
export const updateTask = (id, taskData) => axios.put(`${API_URL}/${id}`, taskData);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
