import React from "react";
import Header from "../components/Header.jsx";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      {/* Content */}
      <div className="flex-grow flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {/* Add Questions Card */}
          <div className="bg-white p-6 rounded shadow-md cursor-pointer hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">Add Questions</h2>
            <p className="text-gray-600">
              Click here to add new questions to the database.
            </p>
          </div>

          {/* Show All Questions Card */}
          <Link
            to="/questions"
            className="bg-white p-6 rounded shadow-md cursor-pointer hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">Show All Questions</h2>
            <p className="text-gray-600">
              View and manage all existing questions.
            </p>
          </Link>

          {/* Show All Users Card */}
          <div className="bg-white p-6 rounded shadow-md cursor-pointer hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">Show All Users</h2>
            <p className="text-gray-600">View and manage all existing users.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
