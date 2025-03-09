import React from "react";
import { useNavigate } from "react-router-dom";

function AboutUs() {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to handle navigation back to the Home page
  const goHome = () => {
    navigate("/"); // Navigate to the Home page
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="text-center text-white">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-xl mb-6">
          We are a team dedicated to providing the best food ordering experience
          for everyone.
        </p>
        <button
          onClick={goHome}
          className="bg-green-500 px-6 py-3 rounded-lg text-white font-bold hover:bg-green-600"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
}

export default AboutUs;
