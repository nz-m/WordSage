import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header.jsx";
import { Link } from "react-router-dom";

const AddQuizQuestionJson = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [jsonContent, setJsonContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleJsonChange = (event) => {
    setJsonContent(event.target.value);
  };

  const handleAddQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await axios.post(
        `${BASE_URL}/quiz/add-questions`,
        JSON.parse(jsonContent)
      );
      setLoading(false);
      setJsonContent("");
      setError(null);
      setSuccess("Questions added successfully!");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Add Questions</h2>
        <textarea
          className="w-full h-40 p-2 border rounded-md mb-4"
          placeholder="Enter JSON content here..."
          value={jsonContent}
          onChange={handleJsonChange}
        />
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button
          className={`${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
          } text-white px-4 py-2 rounded-md`}
          onClick={handleAddQuestions}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Questions"}
        </button>

        <Link to="/" className="ml-4 text-blue-500">
          Go back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AddQuizQuestionJson;
