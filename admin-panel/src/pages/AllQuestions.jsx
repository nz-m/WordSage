import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Question from "../components/Question.jsx";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const AllQuestions = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [questionData, setQuestionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get(
          `${BASE_URL}/level-assessment/get-questions`
        );
        setQuestionData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  const handleQuestionDeleted = (deletedQuestionId) => {
    setQuestionData((prevQuestions) =>
      prevQuestions.filter((question) => question._id !== deletedQuestionId)
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      {/* Content */}
      <div className="flex-grow px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between mb-4">
            <p className="text-gray-500">
              Showing {questionData.length} of {questionData.length} questions
            </p>
            <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              <FaPlus className="mr-2" />
              <Link to="/add-question">Add Question</Link>
            </button>
          </div>
          {loading ? (
            <p className="text-center text-gray-500">Loading questions...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {questionData.map((question) => (
                <Question
                  key={question._id}
                  question={question}
                  onQuestionDeleted={handleQuestionDeleted}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllQuestions;
