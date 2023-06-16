import PropTypes from "prop-types";

export const Button = ({ id, name, icon, type, onClick, children }) => {
  return (
    <button
      id={id || null}
      className={`ninja btn-${name || type || "basic"}`}
      type={type || "button"}
      onClick={onClick || null}
      style={{ display: "flex" }}
    >
      {icon && <img src={icon} id={`${id}-icon`} alt="icon button" />}
      {children}
    </button>
  );
};

Button.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  children: PropTypes.node,
};
Button.defaultProps = {
  id: null,
  name: null,
  type: null,
  icon: null,
  onClick: () => {},
  children: null,
};
