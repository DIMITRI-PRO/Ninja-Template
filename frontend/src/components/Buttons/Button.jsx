import PropTypes from "prop-types";

export const Button = ({ type, onClick, children }) => {
  return (
    <button type={type || "button"} onClick={onClick || null}>
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.element,
};
Button.defaultProps = {
  type: null,
  onClick: () => {},
  children: null,
};
