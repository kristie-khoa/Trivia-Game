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
    path: "/Trivia-Game/",
    element: <Root />,
    children: [
      {
        path: "/Trivia-Game/",
        element: <Home />,
      },
      {
        path: "/Trivia-Game/select",
        element: <Select />,
      },
      {
        path: "/Trivia-Game/:difficulty/:category",
        element: <Quiz />,
      },
      {
        path: "/Trivia-Game/results",
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
