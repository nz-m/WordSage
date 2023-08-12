import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Question from "../components/Question.jsx";
import axios from "axios";

const AllQuestions = () => {
  const [questionData, setQuestionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/level-assessment/get-questions`
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

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      {/* Content */}
      <div className="flex-grow px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading questions...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {questionData.map((question) => (
                <Question key={question.sl} question={question} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllQuestions;
