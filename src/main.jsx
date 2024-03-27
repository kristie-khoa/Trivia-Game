import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./Routes/Root.jsx";
import Quiz from "./Routes/Quiz";
import Results from "./Routes/Results/Results.jsx";
import Select from "./Routes/Select";
import Home from "./Routes/Home";

const router = createBrowserRouter([
  {
    path: "/Trivia-App/",
    element: <Root />,
    children: [
      {
        path: "/Trivia-App/",
        element: <Home />,
      },
      {
        path: "/Trivia-App/select",
        element: <Select />,
      },
      {
        path: "/Trivia-App/:difficulty/:category",
        element: <Quiz />,
      },
      {
        path: "/Trivia-App/results",
        element: <Results />,
        // children: [
        //   {
        //     path: "/results/:category",
        //   },
        // ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
