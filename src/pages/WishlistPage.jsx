import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function WishlistPage() {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);

  // Retrieve wishlist items from localStorage (assuming wishlist is stored in localStorage)
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(storedWishlist);
  }, []);

  const handleRemoveFromWishlist = (itemToRemove) => {
    // Remove item from wishlist in localStorage
    const updatedWishlist = wishlistItems.filter(
      (item) => item.id !== itemToRemove.id
    );
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlistItems(updatedWishlist); // Update the state to re-render the page
  };

  // Handle "Back to Home" navigation
  const handleBackToHome = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p className="text-center text-lg mt-4">Your wishlist is empty!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.price}</p>
              <div className="flex gap-4 mt-4">
                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded"
                  onClick={() => handleRemoveFromWishlist(item)}
                >
                  Remove
                </button>
                <Link
                  to={`/product/${item.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={handleBackToHome}
        className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 mt-6"
      >
        Back to Home
      </button>
    </div>
  );
}

export default WishlistPage;
