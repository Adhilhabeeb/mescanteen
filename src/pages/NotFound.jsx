import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl mt-4">Oops! Page not found</p>
        <Link to="/" className="text-blue-500 underline mt-4 block">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
