import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const BasicMenu = ({ headers, children }) => {
  return (
    <header style={{ border: "1px red solid" }}>
      <nav>
        <ul>
          {headers.map(({ key, path, render, name }) => (
            <li key={key || name}>
              {render || <Link to={`/${path}`}>{name}</Link>}
            </li>
          ))}
        </ul>
      </nav>
      {children}
    </header>
  );
};

BasicMenu.propTypes = {
  headers: PropTypes.shape([]).isRequired,
  children: PropTypes.element,
};
BasicMenu.defaultProps = {
  children: null,
};
