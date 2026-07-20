import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import PostDetails from "./pages/PostDetails/PostDetails";
import SignupPage from "./pages/SignupPage/SignupPage";
import App, { authLoader } from "./App";

const children = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/post/:postId",
    element: <PostDetails />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
];

export const router = createBrowserRouter([
  {
    element: <App />,
    loader: authLoader,
    children: children,
  },
]);
