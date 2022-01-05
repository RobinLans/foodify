import React, { useContext } from "react";
import { recipeInfoCtx } from "../Context";

function RecipeCard({ recipe }) {
  const { setRecipeInfo } = useContext(recipeInfoCtx);

  function handleClick(id) {
    console.log(id);
    setRecipeInfo({
      mealId: id,
    });
  }

  return (
    <div
      className="recipeCard"
      onClick={() => {
        handleClick(recipe.idMeal);
      }}
    >
      <div className="h-72 w-full overflow-hidden relative">
        <img
          src={recipe.strMealThumb}
          alt="recipe"
          className="w-full -top-5 absolute "
        />
      </div>
      <div className="w-full h-28 border-t-4 border-detail flex justify-center items-center  px-4">
        <h1 className=" text-2xl text-center font-bold">{recipe.strMeal}</h1>
      </div>
    </div>
  );
}

export default RecipeCard;
