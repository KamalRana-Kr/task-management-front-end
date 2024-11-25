import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', 
  headers: {
    'Content-Type': 'application/json',
  },
});
const token = localStorage.getItem('authToken');
console.log("token:::::::::::", token);

export const fetchTasks = async ({ sortField, sortOrder, search }) => {
  let string = `tasks`;

  if (sortField && sortOrder) {
    string = `tasks?sortField=${sortField}&sortOrder=${sortOrder}`;
  }
  if (search) {
    string = `tasks?search=${search}`;
  }
  if (sortField && sortOrder && search) {
    string = `tasks?sortField=${sortField}&sortOrder=${sortOrder}&search=${search}`;
  }

  console.log("Requesting:", string);

  const response = await api.get(string, {
    headers: {
      'Authorization': `Bearer ${token}`,  
    },
  });

  return response.data.data;
};

export const createTask = async (task) => {
  const response = await api.post('/tasks', task,{
    headers: {
      'Authorization': `Bearer ${token}`, 
    },
  });
  return response.data;
};

export const updateTask = async (id, updatedTask) => {
  const response = await api.patch(`/tasks/${id}`, updatedTask,{
    headers: {
      'Authorization': `Bearer ${token}`,  
    },
  });
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`,{
    headers: {
      'Authorization': `Bearer ${token}`,  
    },
  });
  return response.data;
};

export const loginUser = async (username, password) => {
  const response = await api.post('/user/login', { username, password });
  console.log("Login response:", response);

  if (response.status === 401) {
    throw new Error('Invalid Username or Password');
  }

  if (response.data.data.access_token) {
    localStorage.setItem('authToken', response.data.data.access_token);
  }

  return response.data;
};

