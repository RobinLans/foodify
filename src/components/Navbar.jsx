import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { recipeInfoCtx } from "../Context";
import LoginModal from "./LoginModal";
import { FaUtensils } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";

function Navbar() {
  const navigate = useNavigate();
  const { showLoginModal, setShowLoginModal } = useContext(recipeInfoCtx);

  function goHome() {
    navigate("/");
  }

  function handleUserBtnClick() {
    setShowLoginModal(!showLoginModal);
  }

  return (
    <div className="navbar">
      <div className="navContainers cursor-pointer" onClick={goHome}>
        <FaUtensils className="text-primary h-12 w-12 transform rotate-45 " />
        <h1 className="text-primary text-5xl font-bold ml-4">Foodify</h1>
      </div>
      <div>
        <Link to="/" className="links mr-2">
          Search
        </Link>
        <Link to="favorites" className="links ml-2">
          Favorites
        </Link>
      </div>
      <div className="navContainers justify-end">
        <div className="relative">
          <button onClick={handleUserBtnClick}>
            <BiUserCircle className="text-primary h-14 w-14" />
          </button>
          {showLoginModal && <LoginModal />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
