import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ addEmployee, updateEmployee,  setSelectedEmployee, selectedEmployee, isEditing, setIsEditing, setIsTableVisible  }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isEditing && selectedEmployee) {
      setFormData({
        firstName: selectedEmployee.firstName,
        lastName: selectedEmployee.lastName,
        email: selectedEmployee.email,
        phoneNumber: selectedEmployee.phoneNumber
      });
      setIsFormVisible(true);
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      });
    }
  }, [isEditing, selectedEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateEmployee(selectedEmployee._id, formData);
        setSuccessMessage('Employee updated successfully');
      } else {
        await addEmployee(formData);
        setSuccessMessage('Employee added successfully');
        setIsTableVisible(true);
      }
      setFormData({ firstName: '', lastName: '', email: '', phoneNumber: '' });
      setIsFormVisible(false);
      setIsEditing(false);
      setError('');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response.data.error || 'An error occurred');
    }
  };
  

  return (
    <div>
      {!isFormVisible && !isEditing && (
        <button
          onClick={() => {
            setIsFormVisible(true);
            setIsTableVisible(false);
            setSelectedEmployee(null);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Create Employee
        </button>
      )}
      {(isFormVisible || isEditing) && (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-2">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            {isEditing ? 'Update' : 'Add'} Employee
          </button>
          <button
            type="button"
            onClick={() => {
              setIsFormVisible(false);
              setIsEditing(false);
              setFormData({ firstName: '', lastName: '', email: '', phoneNumber: '' });
              setError('');
              setSuccessMessage('');
              setIsTableVisible(true);
            }}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default EmployeeForm;
