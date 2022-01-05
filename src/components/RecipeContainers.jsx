import React from "react";
import RecipeCard from "../components/RecipeCard";

function RecipeContainers({ recipeList }) {
  console.log("RecipeContainers", recipeList);
  return (
    <>
      {recipeList ? (
        <div className="w-full grid grid-cols-1 gap-y-8 my-4 md:grid-cols-2  lg:grid-cols-3">
          {recipeList &&
            recipeList.map((recipe, i) => {
              return <RecipeCard recipe={recipe} key={i} />;
            })}
        </div>
      ) : (
        <h1 className="text-3xl mt-6 text-primary">
          No Matching Search Results
        </h1>
      )}
    </>
  );
}

export default RecipeContainers;
