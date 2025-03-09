import React, { useEffect, useState } from "react";
import HomeEachItemSection from "./HomeEachItemSection";

function BreakfastItems(params) {
  const { recipes } = params;
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [beverage, setBeverage] = useState([]);

  useEffect(() => {
    setBreakfast(
      recipes.filter((recipe) => recipe.mealType.includes("Breakfast"))
    );
    setLunch(recipes.filter((recipe) => recipe.mealType.includes("Lunch")));
    setDinner(recipes.filter((recipe) => recipe.mealType.includes("Dinner")));
    setBeverage(
      recipes.filter((recipe) => recipe.mealType.includes("Beverage"))
    );
  }, [recipes]);

  return (
    <main>
      <HomeEachItemSection title="Breakfast" items={breakfast} />
      <HomeEachItemSection title="Lunch" items={lunch} />
      <HomeEachItemSection title="Dinner" items={dinner} />
      <HomeEachItemSection title="Beverage" items={beverage} />
    </main>
  );
}

export default BreakfastItems;
