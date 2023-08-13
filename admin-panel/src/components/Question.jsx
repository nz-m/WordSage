import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const Question = ({ question, onQuestionDeleted }) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { _id, questionText, options, correctAnswer, level } = question;

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/level-assessment/delete-question/${_id}`);
      onQuestionDeleted(_id);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md relative">
      <button
        className="absolute top-4 right-4 text-red-500"
        onClick={handleDelete}
      >
        <FaTrashAlt />
      </button>
      <h2 className="text-lg font-semibold mb-2">{questionText}</h2>
      <div className="grid gap-2">
        {options.map((option) => (
          <div
            key={option.id}
            className={`p-4 rounded-md cursor-pointer hover:bg-blue-100 ${
              option.id === correctAnswer ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            <p>{option.optionText}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-gray-500">Level: {level}</p>
    </div>
  );
};

export default Question;
