import React, { useEffect, useState } from "react";
import TodaysSpecial from "./HomePageContents/TodaysSpecial";
import BreakfastItems from "./HomePageContents/BreakfastItems";

function HomePageItems() {
  const [recipes, setRecipes] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch("https://dummyjson.com/recipes");
      const data = await response.json();
      setRecipes(data.recipes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <TodaysSpecial recipes={recipes} />
      <BreakfastItems recipes={recipes} />
    </div>
  );
}

export default HomePageItems;
