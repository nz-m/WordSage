import React from "react";
import Header from "../components/Header.jsx";
import { Link } from "react-router-dom";

const Lesson = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Lesson Management</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Link
            to="/create-lessons"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create Lessons
          </Link>
          <Link
            to="/add-words"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Words
          </Link>
          <Link
            to="/add-quiz-questions"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Quiz Questions
          </Link>
          <Link
            to="/create-quiz"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create Quiz
          </Link>

          <Link
            to="/add-level-up-test-questions"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Level Up Test Questions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
