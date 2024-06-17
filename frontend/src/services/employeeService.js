import axios from 'axios';
axios.defaults.withCredentials = true;
const API_BASE_URL = 'http://localhost:4000';
// const API_BASE_URL = 'https://simple-crud-operations.onrender.com/';

export const fetchEmployees = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees`);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const fetchEmployee = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching employee with ID ${id}:`, error);
    throw error;
  }
};

export const addEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/employees`, employeeData);
    return response.data;
  } catch (error) {
    console.error('Error adding employee:', error);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting employee with ID ${id}:`, error.message);
    throw error;
  }
};


export const blockEmployee = async (id) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/employees/${id}/block`);
    return response.data;
  } catch (error) {
    console.error('Error toggling employee block status:', error);
    throw error;
  }
};

export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/employees/${id}`, employeeData);
    return response.data;
  } catch (error) {
    console.error(`Error updating employee with ID ${id}:`, error);
    throw error;
  }
};
