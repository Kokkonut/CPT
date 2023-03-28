import React from "react";
import '../styles/index.css';

function Splash() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1>CPT</h1>
      <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        Login or Create Account
      </button>
    </div>
  );
}

export default Splash;
