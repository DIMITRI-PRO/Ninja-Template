import React, { createContext, useContext, useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import axios from "axios";
import jwt from "jwt-decode";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const COOKIE = import.meta.env.VITE_NAME_COOKIE;
const JWT_SECRET = import.meta.env.VITE_JWT_SECRET;

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [cookie, setCookie] = useState();
  const [user, setUser] = useState({
    lastname: null,
    firstname: null,
    email: null,
    pseudo: null,
    picture: null,
  });

  const getCookie = (name) => {
    const cookieValue = document.cookie.match(
      `(^|;)\\s*${name}\\s*=\\s*([^;]+)`
    );
    return cookieValue ? cookieValue.pop() : "";
  };

  const deleteCookie = () => {
    document.cookie = `${COOKIE}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    setUser({
      lastname: null,
      firstname: null,
      email: null,
      pseudo: null,
      picture: null,
    });
    setIsLogin(false);
  };

  const requestAPI = async (methodType, resource, body) => {
    let result = [];

    try {
      let method = methodType;
      let resourceName = resource;

      switch (true) {
        case methodType === "delete":
          method = "delete";
          break;
        case methodType === "patch":
          method = "patch";
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
    } catch (e) {
      console.error(e);
    }
    return result;
  };

  const decodeCookie = async (toDecodeCookie, secret) => {
    try {
      const decoded = jwt(toDecodeCookie, secret);
      const { data } = await requestAPI(`users/${decoded.sub}`);
      setUser(data);
      setIsLogin(true);
    } catch (err) {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    setCookie(getCookie(COOKIE));
  }, [requestAPI]);

  useEffect(() => {
    if (cookie) decodeCookie(cookie, JWT_SECRET);
    else setIsLogin(false);
  }, [cookie]);

  return (
    <AuthContext.Provider
      value={{ requestAPI, cookie, deleteCookie, user, isLogin, setIsLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useAuthContext = () => useContext(AuthContext);
