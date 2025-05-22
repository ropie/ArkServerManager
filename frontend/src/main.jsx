import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import App from './App.jsx'
import PlayerList from "./components/List.jsx";
//import Record from "./components/ViewPlayer.jsx"


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <PlayerList />,
      },
    ],
  },
 /*   {
    path: "/view/:id",
    element: <App />,
    children: [
      {
        path: "/view/:id",
        element: <Record />,
      },
    ],
  },*/
  ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
