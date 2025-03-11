import React from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { LuDot } from "react-icons/lu";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function HomeEachItemSection({ items, title }) {
  const navigate = useNavigate(); // Initialize navigate

  const handleItemClick = (food) => {
    // Navigate to the item detail page with the food item data
    navigate(`/item/${food.id}`, { state: { food } });
  };

  return (
   
    <div className="mx-[10%] relative">
      <h1 className="text-2xl font-black my-8 mb-6">For {title}</h1>
      <div
        className={`grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 overflow-hidden scroll-smooth scrollbar-hide pb-2 px-2`}
      >
        {items?.map((food, index) => (
          <div
            className="flex flex-col gap-2 min-w-[120px] items-center cursor-pointer" // Add cursor-pointer for clicking
            key={index}
            onClick={() => handleItemClick(food)} // Handle click event
          >
            <div className="aspect-[4/3] overflow-hidden bg-yellow-900 w-full rounded-2xl">
              <img src={food.image} className="w-full h-full object-cover" />
            </div>
            <div className="flex w-full p-2 pt-0 flex-col">
              <h2 className="font-bold">{food.name}</h2>
              <div className="flex font-bold text-sm">
                <div className="flex items-center gap-1">
                  <TiStarFullOutline className="text-lg text-yellow-500" />
                  <p>{food.rating}</p>
                </div>
                <div className="flex items-center">
                  <LuDot className="text-2xl" />
                  <p>
                    {food.prepTimeMinutes} - {food.prepTimeMinutes + 5} min
                  </p>
                </div>
              </div>
              <p>
                <span className="text-sm text-gray-400">Item</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <hr className="my-6 text-gray-400 opacity-30" />
    </div>
  );
}

export default HomeEachItemSection;
