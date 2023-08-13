import React from "react";
import Header from "../components/Header.jsx";
import { Link } from "react-router-dom";
import { FaBook, FaQuestion, FaClipboardList } from "react-icons/fa";

const AdminHome = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      {/* Content */}
      <div className="flex-grow flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {/* Show All Questions Card */}
          <Link
            to="/questions"
            className="bg-white p-6 rounded shadow-md cursor-pointer hover:shadow-lg transition flex flex-col items-center justify-center text-center"
          >
            <FaQuestion className="text-4xl mb-2 text-blue-500" />
            <h2 className="text-xl font-semibold mb-2">Assessment Questions</h2>
            <p className="text-gray-600">
              View and manage all existing assessment questions.
            </p>
          </Link>

          {/* Quiz Questions Card */}
          <div className="bg-white p-6 rounded shadow-md cursor-pointer hover:shadow-lg transition flex flex-col items-center justify-center text-center">
            <FaClipboardList className="text-4xl mb-2 text-blue-500" />
            <h2 className="text-xl font-semibold mb-2">Quiz Questions</h2>
            <p className="text-gray-600">Manage all existing quiz questions.</p>
          </div>

          {/* Show All Users Card */}
          <div className="bg-white p-6 rounded shadow-md cursor-pointer hover:shadow-lg transition flex flex-col items-center justify-center text-center">
            <FaBook className="text-4xl mb-2 text-blue-500" />
            <h2 className="text-xl font-semibold mb-2">Lessons</h2>
            <p className="text-gray-600">
              Manage lessons and their associated resources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
