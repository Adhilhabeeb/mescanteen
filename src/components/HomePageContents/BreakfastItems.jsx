import React, { useEffect, useState } from "react";
import HomeEachItemSection from "./HomeEachItemSection";

function BreakfastItems(params) {
  const { recipes } = params;
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [beverage, setBeverage] = useState([]);

  useEffect(() => {
    console.log(recipes,"treffggg")
    // setBreakfast(
    //   recipes.filter((recipe) => recipe.mealType.includes("Breakfast"))
    // );
    // setLunch(recipes.filter((recipe) => recipe.mealType.includes("Lunch")));
    // setDinner(recipes.filter((recipe) => recipe.mealType.includes("Dinner")));
    // setBeverage(
    //   recipes.filter((recipe) => recipe.mealType.includes("Beverage"))
    // );
  }, [recipes]);

  return (
    <main>
  
     {recipes &&
     <>
      <HomeEachItemSection title="Breakfast" items={recipes.breakfast} />
      <HomeEachItemSection title="Lunch" items={recipes.lunch} />
      <HomeEachItemSection title="Snacks" items={recipes.snacks} />
      <HomeEachItemSection title="Special" items={recipes.specialFoods} />
     </>
     }
    </main>
  );
}

export default BreakfastItems;
