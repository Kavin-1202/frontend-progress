import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Left corner: Hamburger button */}
      <button className="text-2xl focus:outline-none">
        &#9776;
      </button>

      {/* Center: LearningHub text */}
      <h1 className="text-2xl font-semibold text-center flex-grow">
        LearningHub
      </h1>

      {/* Right corner: Buttons */}
      <div className="flex space-x-4">
        <Link
          to="/signup"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
