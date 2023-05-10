import { Children, cloneElement } from "react";
import PropTypes from "prop-types";

const Form = ({ children, onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    Array.from(formData.entries()).forEach(([name, value]) => {
      data[name] = value;
    });
    onSubmit?.(data);
  };

  return <form onSubmit={(e) => handleSubmit(e)}>{children}</form>;
};

Form.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.element,
};
Form.defaultProps = {
  onSubmit: () => {},
  children: null,
};

const FormItem = ({ label, type, dataName, children }) => {
  const childrenWithProps = Children.map(children, (child) => {
    return cloneElement(child, { name: dataName });
  });

  return (
    <div>
      {label && <label name={dataName || label}>{label}</label>}
      {childrenWithProps || <input type={type} name={dataName || label} />}
    </div>
  );
};

FormItem.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  dataName: PropTypes.string.isRequired,
  children: PropTypes.element,
};
FormItem.defaultProps = {
  type: "text",
  label: "",
  children: null,
};

export const Forms = { Form, FormItem };
