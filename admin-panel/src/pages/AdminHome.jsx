import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBook, FaQuestion, FaUserFriends } from "react-icons/fa";

const AdminHome = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [stats, setStats] = useState();

  useEffect(() => {
    async function fetchStats() {
      const res = await axios.get(`${BASE_URL}/dev/setup-stats`);
      setStats(res.data);
    }
    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="flex-grow flex justify-center items-center">
        Loading setup stats...
      </div>
    );
  }

  const areAllTasksCompleted = Object.values(stats).every(
    (isCompleted) => isCompleted
  );

  const {
    assessmentQuestionsAdded,
    allLessonsCreated,
    wordsAdded,
    quizQuestionsAdded,
    quizCreated,
    levelUpTestQuestionsAdded,
  } = stats;

  const completeTask = async (taskName) => {
    const path = {
      assessmentQuestionsAdded: "/add-question-json",
      allLessonsCreated: "/create-lessons",
      wordsAdded: "/add-words",
      quizQuestionsAdded: "/add-quiz-questions",
      quizCreated: "/create-quiz",
      levelUpTestQuestionsAdded: "/add-level-up-test-questions",
    }[taskName];
    navigate(path);
  };

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

          {/* Manage users card */}
          <Link
            to="/users"
            className="bg-white p-6 rounded shadow-md cursor-pointer hover:shadow-lg transition flex flex-col items-center justify-center text-center"
          >
            <FaUserFriends className="text-4xl mb-2 text-blue-500" />
            <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
            <p className="text-gray-600">View and manage all existing users.</p>
          </Link>

          {/* Lessons card */}
          <Link
            to="/lessons"
            className="bg-white p-6 rounded shadow-md cursor-pointer hover:shadow-lg transition flex flex-col items-center justify-center text-center"
          >
            <FaBook className="text-4xl mb-2 text-blue-500" />
            <h2 className="text-xl font-semibold mb-2">Lessons</h2>
            <p className="text-gray-600">
              Manage lessons and their associated resources.
            </p>
          </Link>
        </div>
      </div>

      <div className="container mx-auto p-2">
        <h2 className="text-xl font-semibold mb-4">Setup Stats</h2>
        <div className="mb-4">
          {!areAllTasksCompleted ? (
            <p className="text-red-500 font-semibold">
              Before you can run the application, please ensure that these tasks
              are completed in order.
            </p>
          ) : (
            <p className="text-green-500 font-semibold">
              You are all set! You can now run the application.
            </p>
          )}
        </div>

        <ul className="space-y-4">
          <li
            className={`flex items-center justify-between p-3 rounded-md border ${
              assessmentQuestionsAdded
                ? "bg-green-100 border-green-400"
                : "bg-red-100 border-red-400"
            }`}
          >
            <span>Add Assessment Questions</span>
            {assessmentQuestionsAdded ? (
              <span className="text-green-600">✔ Completed</span>
            ) : (
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                onClick={() => completeTask("assessmentQuestionsAdded")}
              >
                Add Questions
              </button>
            )}
          </li>
          <li
            className={`flex items-center justify-between p-3 rounded-md border ${
              allLessonsCreated
                ? "bg-green-100 border-green-400"
                : "bg-red-100 border-red-400"
            }`}
          >
            <span>Create Lessons</span>
            {allLessonsCreated ? (
              <span className="text-green-600">✔ Completed</span>
            ) : (
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                onClick={() => completeTask("allLessonsCreated")}
              >
                Create Lessons
              </button>
            )}
          </li>
          <li
            className={`flex items-center justify-between p-3 rounded-md border ${
              wordsAdded
                ? "bg-green-100 border-green-400"
                : "bg-red-100 border-red-400"
            }`}
          >
            <span>Add Words</span>
            {wordsAdded ? (
              <span className="text-green-600">✔ Completed</span>
            ) : (
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                onClick={() => completeTask("wordsAdded")}
              >
                Add Words
              </button>
            )}
          </li>
          <li
            className={`flex items-center justify-between p-3 rounded-md border ${
              quizQuestionsAdded
                ? "bg-green-100 border-green-400"
                : "bg-red-100 border-red-400"
            }`}
          >
            <span>Add Quiz Questions</span>
            {quizQuestionsAdded ? (
              <span className="text-green-600">✔ Completed</span>
            ) : (
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                onClick={() => completeTask("quizQuestionsAdded")}
              >
                Add Quiz Questions
              </button>
            )}
          </li>
          <li
            className={`flex items-center justify-between p-3 rounded-md border ${
              quizCreated
                ? "bg-green-100 border-green-400"
                : "bg-red-100 border-red-400"
            }`}
          >
            <span>Create Quiz</span>
            {quizCreated ? (
              <span className="text-green-600">✔ Completed</span>
            ) : (
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                onClick={() => completeTask("quizCreated")}
              >
                Create Quiz
              </button>
            )}
          </li>
          <li
            className={`flex items-center justify-between p-3 rounded-md border ${
              levelUpTestQuestionsAdded
                ? "bg-green-100 border-green-400"
                : "bg-red-100 border-red-400"
            }`}
          >
            <span>Add Level Up Test Questions</span>
            {levelUpTestQuestionsAdded ? (
              <span className="text-green-600">✔ Completed</span>
            ) : (
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                onClick={() => completeTask("levelUpTestQuestionsAdded")}
              >
                Add Level Up Test Questions
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminHome;
