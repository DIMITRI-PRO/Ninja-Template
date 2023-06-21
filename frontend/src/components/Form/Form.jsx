import React, { Children, cloneElement } from "react";
import PropTypes from "prop-types";

const Form = ({ children, onSubmit, initialValues, errors }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    Array.from(formData.entries()).forEach(([name, value]) => {
      data[name] = value;
    });
    onSubmit?.(data);
  };

  const renderChildrenWithProps = (errorArray) => {
    if (!initialValues)
      return Children.map(children, (child) => {
        if (child.props.dataName) {
          const errorMessage = errorArray.find(
            (el) => el.context.key === child.props.dataName
          );
          return cloneElement(child, {
            name: child.props.dataName,
            errorMessage,
          });
        }
        return child;
      });

    return Children.map(children, (child) => {
      if (child.props.dataName && initialValues[child.props.dataName]) {
        const initialValue = initialValues[child.props.dataName];
        return cloneElement(child, {
          name: child.props.dataName,
          defaultValue: initialValue,
        });
      }
      return child;
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {renderChildrenWithProps(errors)}
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  initialValues: PropTypes.shape({}),
  errors: PropTypes.arrayOf(PropTypes.shape({})),
};

Form.defaultProps = {
  onSubmit: () => {},
  children: null,
  initialValues: null,
  errors: [],
};

const FormItem = ({
  label,
  type,
  dataName,
  children,
  defaultValue,
  errorMessage,
  required,
  readOnly,
}) => {
  const childrenWithProps = Children.map(children, (child) => {
    return cloneElement(child, { name: dataName });
  });

  return (
    <div>
      {label && <label htmlFor={dataName}>{label}</label>}
      {childrenWithProps || (
        <input
          type={type}
          name={dataName}
          defaultValue={defaultValue}
          required={required}
          readOnly={readOnly}
        />
      )}
      <span>{errorMessage?.message || null}</span>
    </div>
  );
};

FormItem.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  dataName: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  defaultValue: PropTypes.node,
  errorMessage: PropTypes.shape({ message: PropTypes.string }),
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
};

FormItem.defaultProps = {
  label: "",
  type: "text",
  children: null,
  defaultValue: null,
  errorMessage: null,
  required: false,
  readOnly: false,
};

export const Forms = { Form, FormItem };
