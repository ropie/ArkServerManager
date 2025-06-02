import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import CharacterList from "./components/CharacterList.jsx";
import Record from "./components/ViewPlayer.jsx";
import TribeMemberList from "./components/tribe.jsx"
import Dashboard from "./components/Dashboard.jsx";
import PlayerList from "./components/PlayerList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/characters",
    element: <App />,
    children: [
      {
        path: "/characters",
        element: <CharacterList />,
      },
    ],
  },
  {
    path: "/view/:id",
    element: <App />,
    children: [
      {
        path: "/view/:id",
        element: <Record />,
      },
    ],
  },
  {
    path: "/tribe/:tribe",
    element: <App />,
    children: [
      {
        path: "/tribe/:tribe",
        element: <TribeMemberList />,
      },
    ],
  },
    {
    path: "/players",
    element: <App />,
    children: [
      {
        path: "/players",
        element: <PlayerList />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
