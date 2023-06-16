import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Route, useNavigate } from "react-router-dom";
import { AllRoutes } from "./AllRoutes";
import { useAuthContext } from "../context/AuthContext";
import { BasicMenu, Button, BasicMenuLayer } from "../components/NinjaComp";
import { publicRoutes } from "../constant/publicRoutes";
import { privateRoutes } from "../constant/privateRoutes";

const TestRoute31 = () => <div style={{ paddingTop: 100 }}>test okokok</div>;

export const AuthRouter = () => {
  const { t } = useTranslation();
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
          isLogin ? (
            <Button onClick={logOut}>{t("buttons.deconnexion")}</Button>
          ) : null
        }
      />
      <BasicMenuLayer>
        <AllRoutes routes={allRoutes}>
          <Route exact path="test-route" element={TestRoute31()} />
        </AllRoutes>
      </BasicMenuLayer>
    </>
  );
};
