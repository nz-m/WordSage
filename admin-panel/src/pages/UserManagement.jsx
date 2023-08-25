import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Button = ({ children, onClick }) => (
  <button
    className="px-4 py-2 bg-blue-500 text-white rounded-md"
    onClick={onClick}
  >
    {children}
  </button>
);

const UserManagement = () => {
  const levels = ["Beginner", "Intermediate", "Advanced"];

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(levels[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(`${BASE_URL}/admin/users`);
        const mappedUsers = response.data.map((user) => ({
          _id: user._id,
          name: user.name,
        }));
        setUsers(mappedUsers);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);
  const handleMarkLessons = async () => {
    if (selectedUser && selectedLevel) {
      try {
        const markLessonsUrl = `${BASE_URL}/admin/mark-all-lessons-as-completed/${selectedUser}/${selectedLevel}`;
        await axios.patch(markLessonsUrl);
        setStatus("success");
        setErrorMessage("");
        console.log("Lessons marked as completed");
      } catch (error) {
        setStatus("error");
        setErrorMessage("Error marking lessons as completed");
        console.error("Error marking lessons as completed:", error);
      }
    }
  };

  const handleRemoveTestRestriction = async () => {
    if (selectedUser && selectedLevel) {
      try {
        const removeRestrictionUrl = `${BASE_URL}/admin/test-restriction/${selectedUser}/${selectedLevel}`;
        await axios.delete(removeRestrictionUrl);
        setStatus("success");
        setErrorMessage("");
        console.log("Test restriction removed");
      } catch (error) {
        setStatus("error");
        setErrorMessage("Error removing test restriction");
        console.error("Error removing test restriction:", error);
      }
    }
  };

  if (isLoading || !users)
    return <div className="flex justify-center items-center">Loading...</div>;

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center my-8">
        <div className="mb-4 flex justify-center items-center">
          <select
            className="border rounded-md px-2 py-1 w-full"
            value={selectedUser}
            onChange={(event) => {
              setSelectedUser(event.target.value);
              console.log("Selected user:", event.target.value);
            }}
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>

          <select
            className="border rounded-md px-2 py-1 w-full"
            value={selectedLevel}
            onChange={(event) => setSelectedLevel(event.target.value)}
          >
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center items-center">
          <Button onClick={handleMarkLessons}>
            Mark all lessons as complete
          </Button>
          <Button onClick={handleRemoveTestRestriction}>
            Remove Test Restriction
          </Button>
        </div>

        {status === "success" && (
          <div className="mt-4 text-green-500">Success!</div>
        )}
        {status === "error" && (
          <div className="mt-4 text-red-500">{errorMessage}</div>
        )}
      </div>
    </>
  );
};

export default UserManagement;
