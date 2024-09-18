import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from '../../pages/Home';
import ErrorPage from "../../pages/ErrorPage";
import Playlist from "../../pages/Playlist";


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
        ],
    },
]);
