import { Home, Login, Register, NotFound } from "../pages/index";

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
