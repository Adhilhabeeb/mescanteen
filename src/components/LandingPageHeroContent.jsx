import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";

function LandingPageHeroContent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="w-[60%] text-center mx-auto mt-20 lg:mt-10 font-bold text-white">
        <h1 className="text-5xl mb-10 lg:mb-0">
          Order food & groceries. Discover best restaurants. Only on Cafetech!
        </h1>
      </div>
      <div className="lg:flex gap-4 justify-center my-10 hidden">
        <div className="bg-white flex items-center px-5 py-2 rounded-2xl gap-2 w-[20%] relative">
          <FaLocationDot className="text-2xl text-orange-500 cursor-pointer" />
          <input
            type="text"
            className="h-11 w-full placeholder:font-bold placeholder:opacity-80 focus-visible:outline-0"
            placeholder="Enter your delivery location"
          />
          {isOpen ? (
            <FaChevronUp
              className="text-xl cursor-pointer opacity-80 select-none"
              onClick={() => setIsOpen(!isOpen)}
            />
          ) : (
            <FaChevronDown
              className="text-xl cursor-pointer opacity-80 select-none"
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
          {isOpen && (
            <div className="absolute bg-white top-18 flex items-center px-6 py-4 rounded-2xl gap-4 select-none cursor-pointer">
              <FaLocationArrow className="text-orange-500 text-xl" />
              <p className="font-bold text-orange-500">
                Use my current location
              </p>
            </div>
          )}
        </div>
        <div className="bg-white flex items-center px-6 py-2 rounded-2xl gap-1 w-[25%] cursor-pointer">
          <input
            type="text"
            className="h-11 w-full placeholder:font-bold placeholder:opacity-80 focus-visible:outline-0 cursor-pointer"
            placeholder="Search for item or more"
            readOnly={true}
          />
          <FaSearch className="text-2xl text-orange-500" />
        </div>
      </div>
      <div className="hidden md:mt-30 md:flex justify-center items-center lg:hidden">
        <div className="flex justify-center items-center gap-2 bg-white w-min px-6 py-2 rounded-3xl text-orange-500 text-lg">
          <h1 className="font-bold">Continue</h1> <FaAngleDoubleRight />
        </div>
      </div>
    </div>
  );
}

export default LandingPageHeroContent;
