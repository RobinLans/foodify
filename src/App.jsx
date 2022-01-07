import { useState } from "react";
import routes from "./routes";
import Navbar from "./components/Navbar";
import RecipeModal from "./components/RecipeModal";
import { recipeInfoCtx } from "./Context";

function App() {
  const [recipeInfo, setRecipeInfo] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  console.log("recipeInfo", recipeInfo);
  console.log("showLoginModal", showLoginModal);

  return (
    <recipeInfoCtx.Provider
      value={{ recipeInfo, setRecipeInfo, showLoginModal, setShowLoginModal }}
    >
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
        {showLoginModal && (
          <div
            className="absolute w-full h-full"
            onClick={() => {
              setShowLoginModal(false);
            }}
          ></div>
        )}
      </div>
    </recipeInfoCtx.Provider>
  );
}

export default App;
