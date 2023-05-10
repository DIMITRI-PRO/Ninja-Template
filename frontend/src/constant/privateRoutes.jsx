import { useParams } from "react-router-dom";

const TestComponent1 = () => {
  return <div>test1</div>;
};
const TestComponent2 = () => {
  return <div>test2</div>;
};
const TestComponentId = () => {
  const { id } = useParams();
  return <div>test : {id}</div>;
};

export const privateRoutes = [
  {
    path: "/1",
    element: <TestComponent1 />,
    exact: true,
  },
  {
    path: "/2",
    element: <TestComponent2 />,
    exact: true,
  },
  {
    path: "/2/:id",
    element: <TestComponentId />,
    exact: true,
  },
];
