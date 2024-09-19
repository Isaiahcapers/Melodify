import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Add RouterProvider here
import "./index.css";

import App from "./App";
import Error from "./pages/ErrorPage";
import Login from "./pages/Login";  // Start at login
import Playlist from "./pages/Playlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />,  // Set login as the default route when user visits "/"
      },
      {
        path: "/login",
        element: <Login />,  // Direct /login route as well
      },
      {
        path: "/playlist",
        element: <Playlist />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<RouterProvider router={router} />); // Now RouterProvider is recognized
}
