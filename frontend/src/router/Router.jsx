import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { AllRoutes } from "./AllRoutes";
import { useMessageContext } from "../context/MessageNotifContext";
import { useAuthContext } from "../context/AuthContext";
import {
  BasicMenu,
  Button,
  BasicMenuLayer,
  NotificationMessage,
} from "../components/NinjaComp";
import { publicRoutes } from "../constant/publicRoutes";
import { privateRoutes } from "../constant/privateRoutes";
import { User } from "../assets/FeatherIcons";

const UserHeader = () => {
  const { authMemo } = useAuthContext();
  const { user } = authMemo;

  const title = (
    <Link to="/profile">
      <img
        className="menu profile-picture"
        src={user?.picture || User}
        alt={user?.pseudo}
      />
      {user?.pseudo}
    </Link>
  );

  if (user?.pseudo) return title;

  return <div />;
};

export const AuthRouter = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { deleteCookie, authMemo } = useAuthContext();
  const { displayMessage, setDisplayMessage, content, setErrors } =
    useMessageContext();
  const { isLogin, user } = authMemo;
  const [allRoutes, setAllRoutes] = useState(publicRoutes);

  useEffect(() => {
    if (isLogin) setAllRoutes([...publicRoutes, ...privateRoutes]);
    else setAllRoutes(publicRoutes);
  }, [isLogin]);

  const logOut = () => {
    deleteCookie();
    navigate("/login");
  };

  const renderExtraButtons = (isLog) =>
    isLog ? <Button onClick={logOut}>{t("buttons.deconnexion")}</Button> : null;

  return (
    <>
      <BasicMenu
        userData={user}
        headers={allRoutes}
        typeMenu="only-mobile"
        extraMenuButton={renderExtraButtons(isLogin)}
        homeExtra={<UserHeader />}
      />
      <NotificationMessage
        display={displayMessage}
        setDisplay={setDisplayMessage}
        content={content}
        setErrors={setErrors}
      />
      <BasicMenuLayer>
        <AllRoutes routes={allRoutes} />
      </BasicMenuLayer>
    </>
  );
};
