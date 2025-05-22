import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import './CSS/Body.css';

import App from "./App";
import Error from "./pages/ErrorPage";
import Login from "./pages/Login";  // Start at login
import Playlist from "./pages/Playlist";
import Home from "./pages/Home";
import { DataLayer } from "./DataLayer";
import reducer, { initialState} from "./components/Reducer";

const router = createBrowserRouter([
  {
    path: "*", // Use '*' here to handle nested routes properly
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace /> // Redirect to 'login' initially
      },
      {
        path: "login", // Make this a relative path
        element: <Login />, // Direct /login route
      },
      {
        path: "playlist", // Relative path for playlist
        element: <Playlist />,
      },
      {
        path: "home", // Relative path for home
        element: <Home />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
  <DataLayer initialState={initialState} reducer={reducer}>
  <RouterProvider router={router} />
  </DataLayer>
  );
}
