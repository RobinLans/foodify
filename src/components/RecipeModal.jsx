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

      console.log(entries);

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
        console.log(elem !== "" && !elem.includes("STEP"));
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

  console.log(instructions);

  return (
    <>
      <div className="bg-white opacity-100 w-[585px] h-[630px] z-10 rounded-md relative overflow-hidden flex flex-col">
        <div className="h-96 w-full overflow-hidden border-b-4 border-detail relative">
          <h1
            className="absolute top-1 text-5xl text-primary hover:text-background z-10 right-2 font-bold cursor-pointer"
            onClick={handleExit}
          >
            X
          </h1>
          <button className="absolute top-2 left-2 bg-background h-12 w-12 rounded-full flex justify-center items-center z-10">
            <BsFillSuitHeartFill className="text-3xl text-white" />
          </button>
          <img
            src={recipeToDisplay.strMealThumb}
            alt="recipe"
            className="absolute w-full -top-20"
          />
        </div>
        <div className="h-full w-full relative overflow-y-auto flex">
          <div className="h-full w-2/6 overflow-y-auto flex flex-col items-center pb-6">
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
          <div className="h-full w-4/6 overflow-y-auto flex flex-col items-center pb-6">
            <h1 className="text-xl font-bold my-2">Ingredients</h1>
            {instructions &&
              instructions.map((elem, i) => {
                return (
                  <div className="py-2 pl-6 pr-4  w-full flex flex-col" key={i}>
                    <p className="text-lg font-bold">Step {i + 1}</p>
                    <p className="text-md ">{elem}</p>
                  </div>
                );
              })}
          </div>
          <div className="absolute h-5/6 w-1 bg-detail top-[1.9rem] left-[12.4rem]"></div>
        </div>
      </div>
      <div
        className="w-full h-full bg-black opacity-40 absolute"
        onClick={handleExit}
      ></div>
    </>
  );
}

export default RecipeModal;
