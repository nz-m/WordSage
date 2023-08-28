import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header.jsx";
import { Link } from "react-router-dom";

const CreateLessonsJson = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [jsonContent, setJsonContent] = useState("");
  const [creatingLoading, setCreatingLoading] = useState(false);
  const [deletingLoading, setDeletingLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleJsonChange = (event) => {
    setJsonContent(event.target.value);
  };

  const handleCreateLessons = async () => {
    try {
      setCreatingLoading(true);
      setError(null);
      setSuccess(false);

      await axios.post(
        `${BASE_URL}/learn/create-lessons`,
        JSON.parse(jsonContent)
      );
      setCreatingLoading(false);
      setJsonContent("");
      setError(null);
      setSuccess("Lessons added successfully!");
    } catch (error) {
      setError(error.message);
      setCreatingLoading(false);
    }
  };

  const handleDeleteLessons = async () => {
    try {
      setDeletingLoading(true);
      setError(null);
      setSuccess(false);

      await axios.delete(`${BASE_URL}/learn/delete-lessons`);
      setDeletingLoading(false);
      setError(null);
      setSuccess("Lessons deleted successfully!");
    } catch (error) {
      setError(error.message);
      setDeletingLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Create Lessons</h2>
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
            creatingLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
          } text-white px-4 py-2 rounded-md mx-2`}
          onClick={handleCreateLessons}
          disabled={creatingLoading}
        >
          {creatingLoading ? "Creating..." : "Create Lessons"}
        </button>

        <button
          className={`${
            deletingLoading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500"
          }
          text-white px-4 py-2 rounded-md`}
          onClick={handleDeleteLessons}
          disabled={deletingLoading}
        >
          {deletingLoading ? "Deleting..." : "Delete Lessons"}
        </button>

        <Link to="/" className="ml-4 text-blue-500">
          Go back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default CreateLessonsJson;
