/* eslint-disable prefer-destructuring */
import { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "../Buttons/Button";
import { LanguageSwitch } from "../Buttons/LanguageSwitch";
import { MoreVertical, X, Home, User } from "../../assets/FeatherIcons";

export const BasicMenu = ({
  icon,
  logoSize,
  typeMenu,
  headers,
  children,
  direction,
  wrap,
  reverse,
  justify,
  bodyAlign,
  alignement,
  extraMenuButton,
  userData,
  homeExtra,
  gap,
}) => {
  const { t } = useTranslation();
  const [displayMobileMenu, setDisplayMobileMenu] = useState(false);

  const ulStyle = {
    justifyContent: justify,
    gap,
  };
  const navStyle = { width: "100%" };
  const linkStyle = { paddingLeft: "1rem", display: "flex" };
  const bodyStyle = {
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

  document.addEventListener("click", (event) => {
    const div = document.getElementById("menu-item-list");
    const btnList = document.getElementById("menu-item-list-btn");
    const iconList = document.getElementById("menu-item-list-btn-icon");

    if (
      displayMobileMenu &&
      !div?.contains(event.target) &&
      !btnList?.contains(event.target) &&
      !iconList?.contains(event.target)
    )
      setDisplayMobileMenu(false);
  });

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
            <Button name="menu" icon={icon || Home} />
          </Link>
          {homeExtra}
        </div>

        <ul id="nav-ul" className="ninja nav-ul" style={ulStyle}>
          {typeMenu !== "only-mobile" &&
            headers.map(({ key, path, render, name, ignore }) => {
              if (!ignore) {
                return (
                  <li key={key || name} className="ninja nav-li">
                    {render || (
                      <Link className="ninja nav-link" to={`${path}`}>
                        {t(`menu.navigation.${name}`)}
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

        {/* Mobile */}
        <div className={`ninja nav-${typeMenu || "basic-mobile"}`}>
          <Button
            id="menu-item-list-btn"
            name="menu"
            onClick={() => {
              setDisplayMobileMenu(!displayMobileMenu);
            }}
            icon={MoreVertical}
          />
          {displayMobileMenu && (
            <ul id="menu-item-list" className="ninja nav-ul-mobile">
              <li className="ninja nav-header-mobile">
                {userData && (
                  <img
                    src={userData?.picture || User}
                    style={{
                      border: "solid 1px black",
                      borderRadius: "50%",
                      padding: "0.2rem",
                    }}
                    height={80}
                    width={80}
                    alt="profile"
                  />
                )}
                <h2>{t("menu.title")}</h2>
                <Button
                  name="menu"
                  icon={X}
                  onClick={() => {
                    setDisplayMobileMenu(false);
                  }}
                />
              </li>
              <hr />
              {headers.map(({ key, path, render, name, ignore }) => {
                if (!ignore) {
                  return (
                    <li key={key || name} className="ninja nav-li-mobile">
                      {render || (
                        <Link className="ninja nav-link-mobile" to={`${path}`}>
                          {t(`menu.navigation.${name}`)}
                        </Link>
                      )}
                    </li>
                  );
                }
                return null;
              })}
              <hr />
              {extraMenuButton && extraMenuButton}
              <LanguageSwitch />
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

BasicMenu.propTypes = {
  icon: PropTypes.element,
  logoSize: PropTypes.string,
  typeMenu: PropTypes.string,
  headers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  children: PropTypes.element,
  extraMenuButton: PropTypes.element,
  direction: PropTypes.string,
  reverse: PropTypes.bool,
  wrap: PropTypes.bool,
  justify: PropTypes.string,
  bodyAlign: PropTypes.string,
  alignement: PropTypes.arrayOf(PropTypes.number),
  gap: PropTypes.number,
  homeExtra: PropTypes.element,
  userData: PropTypes.shape({
    picture: PropTypes.string,
  }),
};

BasicMenu.defaultProps = {
  icon: null,
  typeMenu: null,
  logoSize: "auto",
  children: null,
  extraMenuButton: null,
  direction: "horizontal",
  reverse: false,
  wrap: true,
  justify: "flex-start",
  bodyAlign: "right",
  alignement: [0, 5, 0],
  gap: 15,
  homeExtra: null,
  userData: null,
};
