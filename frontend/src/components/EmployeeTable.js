import React from 'react';

const EmployeeTable = ({ employees, deleteEmployee, blockEmployee, viewEmployeeDetails }) => {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>
      <div className="shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{`${employee.firstName} ${employee.lastName}`}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium flex flex-wrap gap-2">
                  <button
                    onClick={() => viewEmployeeDetails(employee._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => blockEmployee(employee._id)}
                    className={`px-4 py-2 ${employee.isBlocked ? 'bg-green-500' : 'bg-red-500'} text-white rounded hover:bg-opacity-75 focus:outline-none focus:bg-opacity-75`}
                  >
                    {employee.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                  <button
                    onClick={() => deleteEmployee(employee)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
