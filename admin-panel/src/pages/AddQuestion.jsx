import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddQuestion = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([
    { id: 1, optionText: "" },
    { id: 2, optionText: "" },
    { id: 3, optionText: "" },
    { id: 4, optionText: "" },
  ]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [level, setLevel] = useState("Beginner");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleOptionChange = (id, text) => {
    const updatedOptions = options.map((option) =>
      option.id === id ? { ...option, optionText: text } : option
    );
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    setError("");
    const questionData = {
      questionText,
      options,
      correctAnswer,
      level,
    };
    try {
      await axios.post(
        `${BASE_URL}/level-assessment/add-question`,
        questionData
      );
      setIsSuccess(true);

      setQuestionText("");

      setOptions([
        { id: 1, optionText: "" },
        { id: 2, optionText: "" },
        { id: 3, optionText: "" },
        { id: 4, optionText: "" },
      ]);
      setCorrectAnswer(null);
      setLevel("Beginner");
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message ||
          "An error occurred while adding the question."
      );
    } finally {
      setIsLoading(false);
    }
  };
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Add a New Question</h2>
        {isSuccess ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            <span
              className="absolute top-0 bottom-0 right-0 px-3 py-2 cursor-pointer"
              onClick={() => {
                setIsSuccess(false);
              }}
            >
              &#x2715;
            </span>
            Question added successfully!
          </div>
        ) : null}
        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span
              className="absolute top-0 bottom-0 right-0 px-3 py-2 cursor-pointer"
              onClick={() => {
                setError("");
              }}
            >
              &#x2715;
            </span>
            {error}
          </div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="questionText">
              Question Text
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              id="questionText"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              required
            />
          </div>
          {options.map((option) => (
            <div key={option.id} className="mb-3">
              <label
                className="block font-medium mb-1"
                htmlFor={`optionText${option.id}`}
              >
                Option {option.id}
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                id={`optionText${option.id}`}
                value={option.optionText}
                onChange={(e) => handleOptionChange(option.id, e.target.value)}
                required
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="correctAnswer">
              Correct Answer
            </label>
            <select
              className="w-full px-3 py-2 border rounded"
              id="correctAnswer"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(+e.target.value)}
              required
            >
              <option value="">Select Correct Answer</option>
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  Option {option.id}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="level">
              Level
            </label>
            <select
              className="w-full px-3 py-2 border rounded"
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              required
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Add Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
