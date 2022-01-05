import React from "react";
import RecipeCard from "../components/RecipeCard";

function RecipeContainers({ recipeList }) {
  return (
    <>
      {recipeList ? (
        <div className="recipeContainer">
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
