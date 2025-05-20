import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col gap-2">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin">
      </div>
        <p>Fetching user Data</p>
    </div>
  );
};

export default Loader;