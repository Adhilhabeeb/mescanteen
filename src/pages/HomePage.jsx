import React, { useEffect } from "react";
import HomePageItems from "../components/HomePageItems";
import HomePageHeroSection from "../components/HomePageHeroSection";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
  
    if (!localStorage.getItem("auth")) {
      navigate("/login"); // ✅ Redirect if not logged in
    }
  }, [navigate]); // ✅ Only runs once when component mounts

  return (
    <main>
     <HomePageHeroSection />
      <HomePageItems /> 
    </main>
  );
}

export default HomePage;
