import React, { useContext, useEffect, useState } from "react";
import { recipeInfoCtx } from "../Context";
import { BsFillSuitHeartFill } from "react-icons/bs";

function RecipeModal({ setRecipeInfo }) {
  const { recipeInfo } = useContext(recipeInfoCtx);
  const [recipeToDisplay, setRecipeToDisplay] = useState({});
  const [instructions, setInstructions] = useState([]);
  const [ingAndMeas, setIngAndMeas] = useState([]);

  async function fetchRecipeInfo(id) {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    const data = await response.json();

    setRecipeToDisplay(data.meals[0]);
  }

  useEffect(() => {
    fetchRecipeInfo(recipeInfo.mealId);
  }, [recipeInfo]);

  function handleExit() {
    setRecipeInfo(null);
  }

  useEffect(() => {
    if (recipeToDisplay.idMeal) {
      const entries = Object.entries(recipeToDisplay);

      let ingredientsArr = [];
      let measurementsArr = [];
      let instructionsArr = [];

      for (const [key, value] of entries) {
        if (key.includes("Ingredient")) {
          if (value !== "") {
            ingredientsArr.push(value);
          }
        }
        if (key.includes("Measure")) {
          if (value !== "") {
            measurementsArr.push(value);
          }
        }
        if (key.includes("strInstructions")) {
          if (value !== "") {
            instructionsArr = value.split(/\r\n|\n\r|\n|\r/);
          }
        }
      }

      const filteredInstructions = instructionsArr.filter((elem) => {
        return elem !== "" && !elem.includes("STEP");
      });

      setInstructions(filteredInstructions);

      combineIngAndMeasure(ingredientsArr, measurementsArr);
    }
  }, [recipeToDisplay]);

  function combineIngAndMeasure(ing, meas) {
    let combinedArr = [];
    for (let i = 0; i < ing.length; i++) {
      combinedArr.push({ ingredient: ing[i], measurement: meas[i] });
    }

    if (combinedArr.length === ing.length) {
      setIngAndMeas(combinedArr);
    }
  }

  return (
    <>
      <div className="modal">
        <div className="modalImgCon">
          <h1 className="favBtn" onClick={handleExit}>
            X
          </h1>
          <button className="exitBtn">
            <BsFillSuitHeartFill className="text-3xl text-white" />
          </button>
          <img
            src={recipeToDisplay.strMealThumb}
            alt="recipe"
            className="absolute w-full -top-20"
          />
        </div>
        <div className="infoCon">
          <div className="infoSubCon ingCon">
            <h1 className="text-xl font-bold my-2">Ingredients</h1>
            {ingAndMeas &&
              ingAndMeas.map((elem, i) => {
                return (
                  <div className="p-2 w-full" key={i}>
                    <p className="text-lg font-bold ">{elem.ingredient}</p>
                    <p className="text-md ">{elem.measurement}</p>
                  </div>
                );
              })}
          </div>
          <div className="infoSubCon w-4/6">
            <h1 className="text-xl font-bold my-2 w-80 text-center">
              {recipeToDisplay.strMeal}
            </h1>
            {instructions &&
              instructions.map((elem, i) => {
                return (
                  <div className="py-2 pl-6 pr-4  w-full flex flex-col" key={i}>
                    <p className="text-lg font-bold">Step {i + 1}</p>
                    <p className="text-md ">{elem}</p>
                  </div>
                );
              })}
            {recipeToDisplay.strYoutube && (
              <div className="flex flex-col items-center mt-4 border-t-2 pt-4">
                <p className="text-lg font-bold">
                  Need a Youtube video to help you out?
                </p>
                <a href={`${recipeToDisplay.strYoutube}`}>Click here</a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="w-full h-full bg-black opacity-50 absolute"
        onClick={handleExit}
      ></div>
    </>
  );
}

export default RecipeModal;
