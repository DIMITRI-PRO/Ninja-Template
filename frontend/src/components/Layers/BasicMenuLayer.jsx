import PropTypes from "prop-types";

export const BasicMenuLayer = ({ children }) => {
  return <div style={{ marginTop: 75 }}>{children}</div>;
};

BasicMenuLayer.propTypes = {
  children: PropTypes.node.isRequired,
};
