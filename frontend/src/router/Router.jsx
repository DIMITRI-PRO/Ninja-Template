import { useState, useEffect, Suspense } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { BasicMenu, Button } from "../components/NinjaComp";
import { publicRoutes } from "../constant/publicRoutes";
import { privateRoutes } from "../constant/privateRoutes";

const AllRoutes = ({ routes }) => {
  const result = routes.map(({ exact, path, element }, index) => (
    <Route
      key={`${index + path}`}
      exact={exact}
      path={path}
      element={element}
    />
  ));

  return <Routes>{result}</Routes>;
};

AllRoutes.propTypes = {
  routes: PropTypes.shape([]).isRequired,
};

export const AuthRouter = () => {
  const { isLogin, deleteCookie } = useAuthContext();
  const [allRoutes, setAllRoutes] = useState(publicRoutes);

  useEffect(() => {
    if (isLogin) {
      setAllRoutes([...publicRoutes, ...privateRoutes]);
    } else {
      setAllRoutes(publicRoutes);
    }
  }, [isLogin]);

  return (
    <BrowserRouter>
      <BasicMenu headers={publicRoutes}>
        <Button onClick={() => deleteCookie()}>Déconnexion</Button>
      </BasicMenu>
      <Suspense fallback={<div>Loading...</div>}>
        <AllRoutes routes={allRoutes} />
      </Suspense>
    </BrowserRouter>
  );
};

const PrivateRoute = ({ exact, path, element: Component }) => {
  return <Route exact={exact} path={path} element={<Component />} />;
};

PrivateRoute.propTypes = {
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
  element: PropTypes.element,
};
PrivateRoute.defaultProps = {
  exact: true,
  element: null,
};
