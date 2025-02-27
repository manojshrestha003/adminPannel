import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../Context/AdminContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { aToken, setaToken } = useContext(AdminContext);
  const navigate = useNavigate();
  const logOut = ()=>{
    navigate('/')
    aToken &&setaToken("") 
    aToken && localStorage.removeItem('aToken')

  }

  return (
    <div className="flex justify-between items-center bg-white shadow-md px-6 py-2 md:px-8">
      {/* Logo and Role */}
      <div className="flex items-center space-x-4">
        <img
          src={assets.docMeet}
          alt="Admin Logo"
          className="w-44 cursor-pointer border-r-4 rounded-lg"
        />
        <p className="text-lg md:text-xl font-semibold text-gray-800">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>

      {/* Logout Button */}
      <button onClick={logOut} className="bg-red-600 text-white px-4 py-1 rounded-md font-medium hover:bg-red-700 transition duration-300">
        Logout
      </button>
    </div>
  );
};

export default NavBar;
