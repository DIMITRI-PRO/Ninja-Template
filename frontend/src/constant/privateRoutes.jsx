import { Profile } from "../pages/index";

export const privateRoutes = [
  {
    path: "/profile",
    name: "profile",
    element: <Profile />,
    exact: true,
  },
];
