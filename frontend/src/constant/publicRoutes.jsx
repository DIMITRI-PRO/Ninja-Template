import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";

const NotFound = () => <div>not found</div>;

export const publicRoutes = [
  {
    path: "/",
    name: "home",
    element: <Home />,
    exact: true,
    ignore: true,
  },
  {
    path: "/login",
    name: "login",
    element: <Login />,
    exact: true,
  },
  {
    path: "/register",
    name: "register",
    element: <Register />,
    exact: true,
  },
  {
    path: "*",
    element: <NotFound />,
    exact: false,
    ignore: true,
  },
];
