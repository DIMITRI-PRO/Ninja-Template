import PropTypes from "prop-types";
import React, { createContext, useContext, useState } from "react";

export const NotifMessageContext = createContext({});

export const NotifMessageProvider = ({ children }) => {
  const [displayMessage, setDisplayMessage] = useState(false);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  const responseMessage = ({ message, response }) => {
    const { validationErrors } = response.data;
    if (!displayMessage && message) {
      setContent(message);
      setDisplayMessage(true);
    }
    if (validationErrors && response?.status === 422) {
      setErrors(validationErrors);
      return response.data;
    }
    return null;
  };

  return (
    <NotifMessageContext.Provider
      value={{
        responseMessage,
        displayMessage,
        setDisplayMessage,
        content,
        setContent,
        errors,
        setErrors,
      }}
    >
      {children}
    </NotifMessageContext.Provider>
  );
};

NotifMessageProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useMessageContext = () => useContext(NotifMessageContext);
