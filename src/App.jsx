import { useState } from "react";
import routes from "./routes";
import Navbar from "./components/Navbar";
import RecipeModal from "./components/RecipeModal";
import { recipeInfoCtx } from "./Context";

function App() {
  const [recipeInfo, setRecipeInfo] = useState(null);

  return (
    <recipeInfoCtx.Provider value={{ recipeInfo, setRecipeInfo }}>
      <div className="bg-background min-w-screen h-screen font-nunito flex flex-col items-center overflow-y-scroll">
        <Navbar />
        {routes}
        {recipeInfo !== null ? (
          <div className=" h-full w-full absolute flex justify-center items-center">
            <RecipeModal setRecipeInfo={setRecipeInfo} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </recipeInfoCtx.Provider>
  );
}

export default App;
