import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";

export const AllRoutes = ({ routes, children }) => {
  const result = routes.map(({ exact, path, element }, index) => (
    <Route
      key={`${index + path}`}
      exact={exact}
      path={path}
      element={element}
    />
  ));

  return (
    <Routes>
      {children || null}
      {result}
    </Routes>
  );
};

AllRoutes.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  children: PropTypes.node,
};

AllRoutes.defaultProps = {
  children: null,
};
