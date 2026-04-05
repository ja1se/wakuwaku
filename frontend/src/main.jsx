import './index.css';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import Search from './components/Search';
import Category from './components/Category';
import ErrorPage from './components/ErrorPage';
import Mypage from './components/Mypage';

const router = createBrowserRouter([
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
        path: "tv/:id",
        element: <MovieDetail />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "mypage",
        element: <Mypage />,
      },
      {
        path: "category/:type",
        element: <Category />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);