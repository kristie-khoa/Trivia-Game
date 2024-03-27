import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./Routes/Root.jsx";
import Quiz from "./Routes/Quiz";
import Results from "./Routes/Results/Results.jsx";
import Select from "./Routes/Select";
import Home from "./Routes/Home";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/select",
        element: <Select />,
      },
      {
        path: "/:difficulty/:category",
        element: <Quiz />,
      },
      {
        path: "/results",
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