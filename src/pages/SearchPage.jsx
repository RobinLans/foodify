import React, { useState, useEffect } from "react";
import RecipeContainer from "../components/RecipeContainers";
import { FaSearch } from "react-icons/fa";

function SearchPage() {
  const [recipeList, setRecipeList] = useState([]);

  async function fetchRecipes() {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/filter.php?c=seafood"
    );

    const data = await response.json();
    setRecipeList(data.meals);
  }

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="w-screen xl:w-[80rem] flex flex-col items-center">
      <div className="relative">
        <input
          type="text"
          className="m-2 w-[350px] h-10 rounded-md pl-2 pr-12 text-primary"
          placeholder="Search for a recipe"
        />
        <button className="absolute hover:bg-opacity-5 hover:bg-black w-8 h-8 rounded-full flex justify-center items-center top-3 right-4">
          <FaSearch className="text-primary h-6 w-6" />
        </button>
      </div>
      <RecipeContainer recipeList={recipeList} />
    </div>
  );
}

export default SearchPage;
