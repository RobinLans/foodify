import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  function goHome() {
    navigate("/");
  }

  return (
    <div className="navbar">
      <div className="navContainers cursor-pointer" onClick={goHome}>
        <FaUtensils className="text-primary h-12 w-12 transform rotate-45 " />
        <h1 className="text-primary text-5xl font-bold ml-4">Foodify</h1>
      </div>
    </div>
  );
}

export default Navbar;
