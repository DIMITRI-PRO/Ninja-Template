/* eslint-disable prefer-destructuring */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const BasicMenu = ({
  icon,
  logoSize,
  headers,
  children,
  direction,
  wrap,
  reverse,
  justify,
  bodyAlign,
  alignement,
  gap,
}) => {
  const ulStyle = {
    display: "flex",
    justifyContent: justify,
    gap,
  };
  const navStyle = { width: "100%" };
  const linkStyle = { paddingLeft: "1rem" };
  const bodyStyle = {
    display: "flex",
    paddingRight: "20px",
  };

  switch (true) {
    case direction === "vertical":
      ulStyle.flexFlow = `${reverse ? "column-reverse" : "column"} ${
        !wrap ? "nowrap" : ""
      }`;
      break;
    case direction === "horizontal":
      ulStyle.flexFlow = `${reverse ? "row-reverse" : "row"} ${
        !wrap ? "nowrap" : ""
      }`;
      break;

    default:
      break;
  }

  switch (true) {
    case bodyAlign === "left":
      bodyStyle.justifyContent = "flex-start";
      break;
    case bodyAlign === "center":
      bodyStyle.justifyContent = "center";
      break;
    case bodyAlign === "right":
      bodyStyle.justifyContent = "flex-end";
      break;

    default:
      break;
  }

  const calculatePercentages = (numbers) => {
    let diff = 0;
    let result = [];
    const sum = numbers.reduce((acc, val) => acc + val, 0);

    if (sum === 0 || sum >= 10) {
      diff = 100 / numbers.length;
      result = numbers.map(() => `${diff.toFixed(2)}%`);
    }

    if (sum > 0 && sum <= 10) {
      const zeroCount = numbers.filter((n) => n === 0).length;
      diff = (10 - sum) / zeroCount;
      result = numbers.map((n) =>
        n === 0 ? `${(diff * 10).toFixed(2)}%` : `${(n * 10).toFixed(2)}%`
      );
    }

    linkStyle.flexBasis = result[0];
    ulStyle.flexBasis = result[1];
    bodyStyle.flexBasis = result[2];
    return result;
  };

  if (alignement) calculatePercentages(alignement);

  return (
    <header
      className="ninja nav-header-basic"
      style={{ padding: "0.5rem 1rem" }}
    >
      <nav className="ninja nav-basic" style={navStyle}>
        <div style={linkStyle}>
          <Link
            to="/"
            className="ninja nav-home-link"
            style={{ width: logoSize }}
          >
            {icon || (
              <svg width="35" height="35" viewBox="0 0 24 24">
                <path
                  d="M19.07,4.93C17.22,3 14.66,1.96 12,2C9.34,1.96 6.79,3 4.94,4.93C3,6.78 1.96,9.34 2,12C1.96,14.66 3,17.21 4.93,19.06C6.78,21 9.34,22.04 12,22C14.66,22.04 17.21,21 19.06,19.07C21,17.22 22.04,14.66 22,12C22.04,9.34 21,6.78 19.07,4.93M17,12V18H13.5V13H10.5V18H7V12H5L12,5L19.5,12H17Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </Link>
        </div>

        <ul className="ninja nav-ul" style={ulStyle}>
          {headers.map(({ key, path, render, name, ignore }) => {
            if (!ignore) {
              return (
                <li key={key || name} className="ninja nav-li">
                  {render || (
                    <Link className="ninja nav-link" to={`${path}`}>
                      {name}
                    </Link>
                  )}
                </li>
              );
            }
            return null;
          })}
        </ul>

        <div className="ninja nav-children" style={bodyStyle}>
          {children}
        </div>
      </nav>
    </header>
  );
};

BasicMenu.propTypes = {
  icon: PropTypes.element,
  logoSize: PropTypes.string,
  headers: PropTypes.shape([]).isRequired,
  children: PropTypes.element,
  direction: PropTypes.string,
  reverse: PropTypes.bool,
  wrap: PropTypes.bool,
  justify: PropTypes.string,
  bodyAlign: PropTypes.string,
  alignement: PropTypes.shape([]),
  gap: PropTypes.number,
};
BasicMenu.defaultProps = {
  icon: null,
  logoSize: "auto",
  children: null,
  direction: "horizontal",
  reverse: false,
  wrap: true,
  justify: "flex-start",
  bodyAlign: "right",
  alignement: [0, 5, 0],
  gap: 15,
};
