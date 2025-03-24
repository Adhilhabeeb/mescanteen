import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider,signInWithPopup } from "../Firebase";
import { ourcontext } from "../main";
function Login() {

  
  let {user,setuser,loginpa,setloginpa}=useContext(ourcontext)
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

  useEffect(() => {
   
    setloginpa(true)
    return () =>{setloginpa(false) };
  }, [])
  
  const handleLoginem = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter an email and password.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Login successful!");
   setuser(userCredential.user)
   navigate("/")

      })
      .catch((error) => {
        setError(error.message);
        alert(error.message);
      });
  };

  const googleSignIn = async() => {
    try {
      
    
        const result = await signInWithPopup (auth, provider);
        console.log("User Info:", result.user);
     if (result.user) {
     setuser(result.user)
     navigate("/")
     }




      } catch (error) {
        console.error("Error signing in:", error);
      }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    handleLoginem(e)
    setLoading(true);
    setError(""); // Clear previous error messages

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Validate the user credentials
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    setTimeout(() => {
      if (user) {
      
        console.log("Login successful. Storing auth in localStorage");
        setEmail(""); // Clear the email input field
        setPassword(""); // Clear the password input field
        navigate("/"); // Redirect to Home Page
      } else {
        console.log("Invalid credentials"); // Debugging: Invalid login attempt
        setError("Invalid email or password");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="p-10 max-w-md mx-auto bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

      {/* {error && <p className="text-red-500 text-sm mb-3">{error}</p>} */}

      <form onSubmit={handleLogin} className="flex flex-col gap-3">
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
          className="p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition disabled:opacity-50"
          disabled={loading} // Disable while submitting
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <button 
         onClick={googleSignIn}
          className="p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition disabled:opacity-50"
          disabled={loading} // Disable while submitting
        >
          {loading ? "Logging in..." : `sign in with   ` }
          <GoogleIcon  fontSize="small"/>
        </button>

        <Link to={"/signup"}><p  >sign up</p></Link>  
      </form>
    </div>
  );
}

export default Login;
