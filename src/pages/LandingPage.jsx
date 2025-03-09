import React, { useContext } from "react";
import landingCover from "../assets/images/hero-cover3.jpg";
import Header from "../components/Header";
import LandingPageHeroContent from "../components/LandingPageHeroContent";
import LandingPageCards from "../components/LandingPageCards";
import { ourcontext } from "../main";

function LandingPage() {
  
  
  return (
    <main>
      <section className="min-h-[100vh] relative">
        <img
          src={landingCover}
          className="absolute inset-0 -z-10 object-cover w-full h-full"
          alt=""
        />
        <div className="absolute inset-0 bg-black -z-5 opacity-80"></div>
        <Header />
        <LandingPageHeroContent />
        <LandingPageCards />
        {/* <OrderConfirmation.jsx></OrderConfirmation.jsx> */}
      </section>
    </main>
  );
}

export default LandingPage;
