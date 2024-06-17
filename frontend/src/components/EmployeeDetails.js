import React from 'react';

const EmployeeDetails = ({ employee, setSelectedEmployee, startEditing }) => {
  return (
    <div className="mt-4 p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Employee Details</h2>
      <div className="mb-4">
        <p className="text-lg">
          <span className="font-bold">First Name:</span> {employee.firstName}
        </p>
        <p className="text-lg">
          <span className="font-bold">Last Name:</span> {employee.lastName}
        </p>
        <p className="text-lg">
          <span className="font-bold">Email:</span> {employee.email}
        </p>
        <p className="text-lg">
          <span className="font-bold">Phone Number:</span> {employee.phoneNumber}
        </p>
      </div>
      <div className="flex justify-center">
        <button
          onClick={startEditing}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600 focus:outline-none"
        >
          Edit
        </button>
        <button
          onClick={() => setSelectedEmployee(null)}
          className="px-4 py-2 bg-gray-500 text-white rounded ml-2 hover:bg-gray-600 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetails;
