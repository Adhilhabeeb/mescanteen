import React from "react";
import { CgMenuRight } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

function Header({ bg, p }) {
  const navigate = useNavigate();

  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem("auth");

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("auth"); // Clear authentication status
    navigate("/login"); // Redirect to Login page
  };

  // Function to navigate to Cart page
  const goToCart = () => {
    navigate("/cart"); // Navigate to Cart page (create this route if not exists)
  };

  // Function to navigate to Wishlist page
  const goToWishlist = () => {
    navigate("/wishlist"); // Navigate to Wishlist page (create this route if not exists)
  };

  return (
    <div
      className={`flex ${
        bg ? bg : "bg-transparent"
      } justify-between px-6 sm:px-[10%] ${p ? p : "p-8"}`}
    >
      <div className="overflow-hidden rounded">
        <h1 className="text-white font-extrabold text-4xl sm:text-5xl italic font-serif py-1 sm:p-2">
          Cafetech
        </h1>
      </div>
      <div className="flex items-center gap-6">
        <div className="gap-6 hidden lg:flex">
          <p className="font-bold text-white">Cafetech Corporate</p>
          <p className="font-bold text-white">Partner with us</p>
        </div>

        {/* Cart Button */}
        {isAuthenticated && (
          <button
            onClick={goToCart}
            className="w-[100px] p-2 rounded font-extrabold cursor-pointer bg-orange-500 border-2 border-orange-500 text-white"
          >
            Cart
          </button>
        )}

        {/* Wishlist Button */}
        {isAuthenticated && (
          <button
            onClick={goToWishlist}
            className="w-[100px] p-2 rounded font-extrabold cursor-pointer bg-blue-500 border-2 border-blue-500 text-white"
          >
            Wishlist
          </button>
        )}

        {/* About Us or Logout */}
        {!isAuthenticated ? (
          <Link
            to="/about"
            className="w-[100px] p-2 rounded bg-transparent cursor-pointer text-white font-extrabold border-2 border-white"
          >
            About Us
          </Link>
        ) : (
          <button
            className="w-[100px] p-2 rounded font-extrabold cursor-pointer bg-orange-500 border-2 border-orange-500 text-white hidden md:block"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}

        <CgMenuRight className="text-4xl font-bold text-white md:hidden" />
      </div>
    </div>
  );
}

export default Header;
