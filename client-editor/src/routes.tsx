import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import PostDetails from "./pages/PostDetails/PostDetails";
import SignupPage from "./pages/SignupPage/SignupPage";
import App, { authLoader } from "./App";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        loader: authLoader,
        children: [
          {
            path: "/",
            element: <MainPage />,
          },
          {
            path: "/post/:postId",
            element: <PostDetails />,
          },
        ],
      },
    ],
  },
]);
