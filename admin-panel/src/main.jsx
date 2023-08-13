import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AdminHome from "./pages/AdminHome.jsx";
import AllQuestions from "./pages/AllQuestions.jsx";
import AddQuestion from "./pages/AddQuestion.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminHome />,
  },
  {
    path: "/questions",
    element: <AllQuestions />,
  },
  {
    path: "/add-question",
    element: <AddQuestion />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
