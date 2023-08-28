import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header.jsx";
import { Link } from "react-router-dom";

const LevelEnum = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

const LessonTitleEnum = {
  EVERYDAY_CONVERSATIONS: "Everyday Conversations",
  PERSONAL_INFORMATION: "Personal Information",
  HOME_AND_LIVING: "Home and Living",
  FOOD_AND_DINING: "Food and Dining",
  TRAVEL_AND_TRANSPORTATION: "Travel and Transportation",
  HEALTH_AND_WELLNESS: "Health and Wellness",
  WORK_AND_CAREERS: "Work and Careers",
  EDUCATION_AND_LEARNING: "Education and Learning",
  NATURE_AND_ENVIRONMENT: "Nature and Environment",
  TECHNOLOGY_AND_COMMUNICATION: "Technology and Communication",
};

const CreateQuiz = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [title, setTitle] = useState("");
  const [level, setLevel] = useState(LevelEnum.BEGINNER);
  const [lessonTitle, setLessonTitle] = useState(
    LessonTitleEnum.EVERYDAY_CONVERSATIONS
  );
  const [timeLimit, setTimeLimit] = useState(10);
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [creatingLoading, setCreatingLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setCreatingLoading(true);
      setError(null);
      setSuccess(false);

      const formData = {
        title,
        level,
        lessonTitle,
        timeLimit,
        numberOfQuestions,
      };

      await axios.post(`${BASE_URL}/quiz/create`, formData);
      setCreatingLoading(false);
      setError(null);
      setSuccess("Quiz created successfully!");
    } catch (error) {
      setError(error.response.data.message);
      setCreatingLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Create Quiz</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="level" className="block text-sm font-medium mb-1">
              Level:
            </label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="p-2 border rounded w-full"
            >
              {Object.values(LevelEnum).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lessonTitle"
              className="block text-sm font-medium mb-1"
            >
              Lesson Title:
            </label>
            <select
              id="lessonTitle"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              className="p-2 border rounded w-full"
            >
              {Object.values(LessonTitleEnum).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="timeLimit"
              className="block text-sm font-medium mb-1"
            >
              Time Limit:
            </label>
            <input
              type="number"
              id="timeLimit"
              value={timeLimit}
              onChange={(e) => setTimeLimit(parseInt(e.target.value))}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="numberOfQuestions"
              className="block text-sm font-medium mb-1"
            >
              Number of Questions:
            </label>
            <input
              type="number"
              id="numberOfQuestions"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <button
            className={`${
              creatingLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
            } text-white px-4 py-2 rounded-md w-full`}
            type="submit"
            disabled={creatingLoading}
          >
            {creatingLoading ? "Creating..." : "Create Quiz"}
          </button>
          <h4 className="text-gray-500 my-2 text-center">
            Make sure you have added enough questions with the same level and
            same lesson title before creating a quiz.
          </h4>
        </form>
        <Link to="/" className="mt-4 block text-blue-500 text-center">
          Go back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default CreateQuiz;
