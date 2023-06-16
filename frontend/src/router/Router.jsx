import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Route, Routes, useNavigate } from "react-router-dom";
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
  routes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export const AuthRouter = () => {
  const navigate = useNavigate();
  const { deleteCookie, authMemo } = useAuthContext();
  const { isLogin } = authMemo;
  const [allRoutes, setAllRoutes] = useState(publicRoutes);

  useEffect(() => {
    if (isLogin) setAllRoutes([...publicRoutes, ...privateRoutes]);
    else setAllRoutes(publicRoutes);
  }, [isLogin]);

  const logOut = () => {
    deleteCookie();
    navigate("/login");
  };

  return (
    <>
      <BasicMenu
        headers={publicRoutes}
        typeMenu="only-mobile"
        extraMenuButton={
          isLogin ? <Button onClick={logOut}>Déconnexion</Button> : null
        }
      />
      <div style={{ paddingTop: 75 }}>
        <AllRoutes routes={allRoutes} />
      </div>
    </>
  );
};
