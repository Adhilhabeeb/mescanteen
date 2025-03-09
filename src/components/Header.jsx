import React, { useState } from "react";
import { CgMenuRight, CgClose } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

function Header({ bg, p }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem("auth");

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("users");
    navigate("/login");
    window.location.reload();
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`flex items-center justify-between ${bg || "bg-transparent"} px-6 sm:px-[10%] ${p || "p-6"}`}>
      <h1 className="text-white font-extrabold text-3xl sm:text-5xl italic font-serif py-1 sm:p-2">
        Cafetech
      </h1>
      
      {/* Desktop Menu */}
      <nav className="hidden lg:flex items-center gap-6">
        <p className="font-bold text-white">Cafetech Corporate</p>
        <p className="font-bold text-white">Partner with us</p>
        {isAuthenticated && (
          <>
            <button onClick={() => navigate("/cart")} className="btn bg-orange-500 px-4 py-2">Cart</button>
            <button onClick={() => navigate("/wishlist")} className="btn bg-blue-500 px-4 py-2">Wishlist</button>
            <button onClick={handleLogout} className="btn bg-red-500 px-4 py-2">Logout</button>
          </>
        )}
        {!isAuthenticated && (
          <Link to="/about" className="btn border-white text-white px-4 py-2">About Us</Link>
        )}
      </nav>

      {/* Mobile Menu Button */}
      <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
        {menuOpen ? <CgClose className="text-4xl text-white" /> : <CgMenuRight className="text-4xl text-white" />}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-0 w-64 bg-gray-900 p-6 rounded-lg flex flex-col items-center gap-4 shadow-lg lg:hidden">
          <p className="font-bold text-white">Cafetech Corporate</p>
          <p className="font-bold text-white">Partner with us</p>
          {isAuthenticated && (
            <>
              <button onClick={() => navigate("/cart")} className="btn bg-orange-500 w-full px-4 py-3">Cart</button>
              <button onClick={() => navigate("/wishlist")} className="btn bg-blue-500 w-full px-4 py-3">Wishlist</button>
              <button onClick={handleLogout} className="btn bg-red-500 w-full px-4 py-3">Logout</button>
            </>
          )}
          {!isAuthenticated && (
            <Link to="/about" className="btn border-white text-white w-full px-4 py-3">About Us</Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;