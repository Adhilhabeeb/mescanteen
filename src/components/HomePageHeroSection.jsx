import React from "react";
import landingCover from "../assets/images/hero-cover3.jpg";
import { FaSearch } from "react-icons/fa";

function HomePageHeroSection() {
  return (
    <div className="h-[35vh] relative flex justify-center items-center">
      <img
        src={landingCover}
        className="absolute inset-0 -z-10 object-cover w-full h-full"
        alt=""
      />
      <div className="absolute inset-0 bg-black -z-5 opacity-80"></div>
      <h1 className="text-white text-center font-black text-4xl">"Delicious Bites, Quick Service!</h1>
      {/* <div className="bg-white w-[30%] flex justify-center items-center p-10 rounded-sm">
        <form className="flex">
          <div className="flex items-center border rounded-bl-sm rounded-tl-sm">
            <input
              className="p-2 focus-visible:outline-0"
              placeholder="Search for items"
              type="text"
            />
            <FaSearch className="text-xl m-2" />
          </div>
          <button className="p-2 bg-orange-500 border border-black border-l-0 rounded-tr-sm rounded-br-sm font-bold cursor-pointer text-white">
            Submit
          </button>
        </form>
      </div> */}
    </div>
  );
}

export default HomePageHeroSection;
