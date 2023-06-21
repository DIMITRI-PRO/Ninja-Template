import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useLocation } from "react-router-dom";
import { PropTypes } from "prop-types";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useMessageContext } from "./MessageNotifContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const COOKIE = import.meta.env.VITE_NAME_COOKIE;

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const { responseMessage } = useMessageContext();

  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const [cookie, setCookie] = useState();
  const [user, setUser] = useState(null);
  const [refreshUser, setRefreshUser] = useState(false);
  const [id, setId] = useState(null);

  const getCookie = (name) => {
    const cookieValue = document.cookie.match(
      `(^|;)\\s*${name}\\s*=\\s*([^;]+)`
    );
    return cookieValue ? cookieValue.pop() : "";
  };

  const deleteCookie = () => {
    document.cookie = `${COOKIE}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    setUser(null);
    setIsLogin(false);
  };

  const requestAPI = async (methodType, resource, body) => {
    let result = [];

    // eslint-disable-next-line no-useless-catch
    try {
      let method = methodType;
      let resourceName = resource;

      switch (true) {
        case methodType === "delete":
          method = "delete";
          break;
        case methodType === "patch":
          method = "put";
          break;
        case methodType === "post":
          method = "post";
          break;
        case methodType === "get":
          method = "get";
          break;

        default:
          resourceName = method;
          method = "get";
          break;
      }

      const data = await axios.request({
        url: `${BACKEND_URL}/${resourceName || ""}`,
        method,
        headers: {
          Authorization: `Bearer ${cookie || ""}`,
          "Content-Type": "application/json",
        },
        data: body || null,
        withCredentials: true,
      });

      result = data;
    } catch (error) {
      throw error;
    }
    return result;
  };

  const getUser = async (idSub) => {
    try {
      const { data } = await requestAPI("get", `users/${idSub}`);
      setUser(data);
    } catch (e) {
      responseMessage(e);
    }
  };

  const authMemo = useMemo(() => {
    return { user, isLogin, id };
  }, [user, isLogin, id]);

  useEffect(() => {
    if (cookie && isLogin && !user && !id) {
      const { sub } = jwtDecode(cookie);
      getUser(sub);
      setId(sub);
    }
  }, [user, cookie, isLogin, refreshUser]);

  useEffect(() => {
    setCookie(getCookie(COOKIE));
    if (cookie) setIsLogin(true);
    else setIsLogin(false);
  }, [location, cookie]);

  return (
    <AuthContext.Provider
      value={{
        requestAPI,
        cookie,
        deleteCookie,
        setUser,
        setIsLogin,
        authMemo,
        refreshUser,
        setRefreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useAuthContext = () => useContext(AuthContext);
