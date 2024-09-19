import { createBrowserRouter } from "react-router-dom";
import App from "../../client/src/App";
import Home from '../../client/src/pages/Home'
import ErrorPage from "../../client/src/pages/ErrorPage.tsx";
import Playlist from "../../client/src/pages/Playlist";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/playlist',
                element: <Playlist />,
            },
            {
                path: 'login',
                element: <Login />,
            }
        ],
    },
]);
