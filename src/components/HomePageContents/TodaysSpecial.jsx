import React, { useRef } from "react";
import { TiChevronLeft } from "react-icons/ti";
import { TiChevronRight } from "react-icons/ti";

function TodaysSpecial(params) {
  const { recipes } = params;
  const scrollRef = useRef(null);
console.log(recipes,"recckjbkn fvnsc,nv,nscv,ncsv")
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 450; // Adjust scroll amount as needed
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mx-[10%] relative">
      <h1 className="text-2xl font-black my-8 mb-6">Today's Specials!</h1>

      {/* Left Scroll Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute right-0 top-0 -translate-x-[150%] bg-gray-400 text-white p-1 rounded-full shadow-md z-10 cursor-pointer"
      >
        <TiChevronLeft size={20} />
      </button>

      {/* Scrollable Section */}
      <div
        ref={scrollRef}
        className="flex gap-10 overflow-hidden scroll-smooth scrollbar-hide pb-2 px-2"
      >
        {recipes?.map((recipe, index) => (

     
          <div
            className="flex flex-col gap-2 min-w-[120px] items-center"
            key={index}
          >
            <div className="w-[100px] aspect-square rounded-[50%] overflow-hidden">
              <img src={recipe.image ??"https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg"} className="w-full h-full object-cover" />
            </div>
            <h2 className="text-sm text-center">{recipe.name}</h2>
          </div>
        ))}
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-0 bg-gray-400 text-white p-1 rounded-full shadow-md z-10 cursor-pointer"
      >
        <TiChevronRight size={20} />
      </button>
      <hr className="my-6 text-gray-400 opacity-30" />
    </div>
  );
}

export default TodaysSpecial;
