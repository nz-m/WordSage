import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header.jsx";
import { Link } from "react-router-dom";

const AddWordsJson = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [jsonContent, setJsonContent] = useState("");
  const [addingLoading, setAddingLoading] = useState(false);
  const [deletingLoading, setDeletingLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleJsonChange = (event) => {
    setJsonContent(event.target.value);
  };

  const handleAddWords = async () => {
    try {
      setAddingLoading(true);
      setError(null);
      setSuccess(false);

      await axios.post(`${BASE_URL}/learn/add-words`, JSON.parse(jsonContent));
      setAddingLoading(false);
      setJsonContent("");
      setError(null);
      setSuccess("Words added successfully!");
    } catch (error) {
      setError(error.message);
      setAddingLoading(false);
    }
  };

  const handleDeleteWords = async () => {
    try {
      setDeletingLoading(true);
      setError(null);
      setSuccess(false);

      await axios.delete(`${BASE_URL}/learn/delete-words`);
      setDeletingLoading(false);
      setError(null);
      setSuccess("Words deleted successfully!");
    } catch (error) {
      setError(error.message);
      setDeletingLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Add Words</h2>
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
            addingLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
          } text-white px-4 py-2 rounded-md`}
          onClick={handleAddWords}
          disabled={addingLoading}
        >
          {addingLoading ? "Adding..." : "Add Words"}
        </button>
        <button
          className={`${
            deletingLoading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500"
          }
          text-white px-4 py-2 rounded-md ml-4`}
          onClick={handleDeleteWords}
          disabled={deletingLoading}
        >
          {deletingLoading ? "Deleting..." : "Delete Words"}
        </button>

        <Link to="/" className="ml-4 text-blue-500">
          Go back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AddWordsJson;
