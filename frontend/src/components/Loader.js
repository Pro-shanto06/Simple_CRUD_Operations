import React from 'react';

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 border-t-blue-500 animate-spin"></div>
  </div>
);

export default Loader;
