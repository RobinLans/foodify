import React from "react";
import RecipeCard from "../components/RecipeCard";

function RecipeContainers({ recipeList }) {
  return (
    <div className="w-full grid grid-cols-1 gap-y-8 my-4 md:grid-cols-2  lg:grid-cols-3">
      {recipeList &&
        recipeList.map((recipe, i) => {
          return <RecipeCard recipe={recipe} key={i} />;
        })}
    </div>
  );
}

export default RecipeContainers;
