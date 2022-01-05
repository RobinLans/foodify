import React, { useState, useEffect } from "react";
import RecipeContainer from "../components/RecipeContainers";
import { FaSearch } from "react-icons/fa";

function SearchPage() {
  const [recipeList, setRecipeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchRecipes(search = null) {
    if (search === null) {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/filter.php?c=seafood"
      );

      const data = await response.json();
      setRecipeList(data.meals);
    } else if (search) {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );

      const data = await response.json();
      setRecipeList(data.meals);
    }
    setSearchQuery("");
  }

  useEffect(() => {
    fetchRecipes();
  }, []);

  function handleInputChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleSearch(search) {
    fetchRecipes(search);
  }

  function handleKeyPress(e, search) {
    if (e.key === "Enter") {
      fetchRecipes(search);
    }
  }

  return (
    <div className="searchPage">
      <div className="relative">
        <input
          type="text"
          className="searchInput"
          placeholder="Search for a recipe"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            handleKeyPress(e, searchQuery);
          }}
        />
        <button
          className="searchBtn"
          onClick={() => {
            handleSearch(searchQuery);
          }}
        >
          <FaSearch className="text-primary h-6 w-6" />
        </button>
      </div>
      <RecipeContainer recipeList={recipeList} />
    </div>
  );
}

export default SearchPage;
