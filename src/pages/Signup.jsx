import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { ourcontext } from "../main";

function Signup() {
  let {user,setuser} =useContext(ourcontext)
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      navigate("/"); // Redirect to Home if already logged in
    }
  }, [navigate]);

  function handleregister(e) {
    e.preventDefault()


    if (!email || !password) {
        alert("Please enter an email and password.");
        return;
      }
      
        createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setError(false)

        // Signed up 
        const user = userCredential.user;

      // setuser(user)
        // ...
      })
      .catch((error) => {

        alert(":eeror")
        setError(true)
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("erorcode",errorCode,"errpmsg",errorMessage)
        // ..
      });
    }
  const handleSignup = (e) => {
    e.preventDefault();
    
handleregister(e)
    setError(""); // Reset errors

    // ✅ Basic Validation
    if (!email || !password) {
      setError("All fields are required!");
      return;
    }

    setLoading(true); // ✅ Show loading state

    // Simulate storing user credentials in localStorage
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push({ email, password });
      localStorage.setItem("users", JSON.stringify(users)); // Save user data in localStorage
    
      navigate("/"); // Redirect to Home Page after signup
    }, 1000);
  };

  return (
    <div className="p-10 max-w-md mx-auto bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Signup</h2>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <form onSubmit={handleSignup} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="p-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition disabled:opacity-50"
          disabled={loading} // Disable button while submitting
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
