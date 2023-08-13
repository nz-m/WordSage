import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white py-4 w-full text-center">
      <h1 className="text-2xl font-semibold">
        <Link to="/"> Welcome to WordSage Admin Panel</Link>
      </h1>
    </header>
  );
};

export default Header;
