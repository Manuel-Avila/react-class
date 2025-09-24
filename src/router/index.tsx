import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import UserListPage from "../pages/UserListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/user-list",
    element: <UserListPage />,
  },
]);

export default router;
