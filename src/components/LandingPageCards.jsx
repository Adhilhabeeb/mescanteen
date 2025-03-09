import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa6";

function LandingPageCards() {
  const [recipes, setRecipes] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch("https://dummyjson.com/recipes");
      const data = await response.json();
      setRecipes(data.recipes); // Ensure you're setting the correct data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log(recipes);

  return (
    <div className=" lg:grid grid-cols-4 justify-around gap-10 w-[75%] mx-auto hidden">
      {recipes.slice(0, 4).map((recipe) => (
        <div
          key={recipe.id}
          className="p-2 bg-white flex flex-col items-center rounded-2xl lg:p-6"
        >
          <div className="lg:pb-2 rounded-2xl overflow-hidden">
            <img
              className="w-full rounded-2xl"
              src={recipe.image}
              alt={recipe.title}
            />
          </div>
          <div className="w-full hidden lg:block">
            <h3 className="text-center pb-2">{recipe.name}</h3>
            <p className="text-sm flex items-center">
              <FaClock className="mr-1 text-orange-500" />
              Preparation Time:
              <span className="text-orange-500 font-bold pl-1">
                {recipe.prepTimeMinutes} min
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LandingPageCards;
