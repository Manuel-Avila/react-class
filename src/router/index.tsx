import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import UserListPage from "../pages/UserListPage";
import MP3Page from "../pages/MP3Page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/user-list",
    element: <UserListPage />,
  },
  {
    path: "/mp3",
    element: <MP3Page />,
  },
]);

export default router;
