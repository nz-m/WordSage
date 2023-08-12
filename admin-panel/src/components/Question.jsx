import React from "react";

const Question = ({ question }) => {
  const { sl, questionText, options, correctAnswer, level } = question;

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-2">
        Question {sl}: {questionText}
      </h2>
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
