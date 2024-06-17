import React, { useState, useEffect } from 'react';
import {
  fetchEmployees,
  fetchEmployee,
  addEmployee,
  deleteEmployee,
  blockEmployee,
  updateEmployee
} from './services/employeeService';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import EmployeeDetails from './components/EmployeeDetails';
import ConfirmationModal from './components/ConfirmationModal';
import Loader from './components/Loader';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const getEmployees = async () => {
      setIsLoading(true);
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
      setIsLoading(false);
    };
    getEmployees();
  }, []);

  const handleAddEmployee = async (employeeData) => {
    setIsLoading(true);
    try {
      const newEmployee = await addEmployee(employeeData);
      setEmployees([...employees, newEmployee]);
      setSuccessMessage('Employee added successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setError(error.response.data.error || 'An error occurred');
      setTimeout(() => setError(''), 3000);
    }
    setIsLoading(false);
  };

  const handleDeleteEmployee = async () => {
    setIsLoading(true);
    try {
      await deleteEmployee(employeeToDelete._id);
      setEmployees(employees.filter(employee => employee._id !== employeeToDelete._id));
      setSuccessMessage('Employee deleted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
    setEmployeeToDelete(null);
    setIsModalOpen(false);
    setIsLoading(false);
  };

  const handleBlockEmployee = async (id) => {
    setIsLoading(true);
    try {
      const updatedEmployee = await blockEmployee(id);
      setEmployees(employees.map(employee => employee._id === id ? updatedEmployee : employee));
      setSuccessMessage('Employee block status updated');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error blocking employee:', error);
    }
    setIsLoading(false);
  };

  const handleUpdateEmployee = async (id, employeeData) => {
    setIsLoading(true);
    try {
      const updatedEmployee = await updateEmployee(id, employeeData);
      setEmployees(employees.map(employee => employee._id === id ? updatedEmployee : employee));
      setSuccessMessage('Employee updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setError(error.response.data.error || 'An error occurred');
      setTimeout(() => setError(''), 3000);
    }
    setIsEditing(false);
    setSelectedEmployee(null);
    setIsLoading(false);
  };

  const handleSelectEmployee = async (id) => {
    const employee = await fetchEmployee(id);
    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleViewEmployeeDetails = async (id) => {
    const employee = await fetchEmployee(id);
    setSelectedEmployee(employee);
    setIsEditing(false);
  };

  const handleOpenModal = (employee) => {
    setEmployeeToDelete(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEmployeeToDelete(null);
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading && <Loader />}

      <h1 className="text-2xl font-bold mb-4">ASIF INC</h1>

      <EmployeeForm
        addEmployee={handleAddEmployee}
        updateEmployee={handleUpdateEmployee}
        selectedEmployee={selectedEmployee}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />

      {employees.length > 0 && !isEditing && !selectedEmployee && (
        <EmployeeTable
          employees={employees}
          deleteEmployee={handleOpenModal}
          blockEmployee={handleBlockEmployee}
          selectEmployee={handleSelectEmployee}
          viewEmployeeDetails={handleViewEmployeeDetails}
        />
      )}

      {employees.length === 0 && (
        <p className="text-gray-600 text-center mt-4">No employees found.</p>
      )}

      {selectedEmployee && !isEditing && (
        <EmployeeDetails
          employee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          startEditing={() => setIsEditing(true)}
        />
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDeleteEmployee}
        message={`Are you sure you want to delete ${employeeToDelete?.firstName} ${employeeToDelete?.lastName}?`}
      />
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </div>
  );
};

export default App;
