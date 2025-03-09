import { useState, useEffect } from "react";

export default function OrderConfirmation() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Generate a random token number between 1000 and 9999
    setToken(Math.floor(1000 + Math.random() * 9000));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
      <h1 className="text-3xl font-bold mb-6">Your Order is Placed</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 text-2xl font-semibold mb-6">
        Token Number: <span className="text-blue-600">{token}</span>
      </div>
      <p className="text-lg text-gray-600">
        Your order has been confirmed. Wait for your token to appear on the
        screen.
      </p>
         
    </div>
  );
}
