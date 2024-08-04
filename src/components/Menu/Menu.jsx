import { Link } from "react-router-dom";
import "./Menu.css";

import { useTheme } from "../ThemeContext/ThemeContext";

function Menu() {
  const { theme, toggleTheme } = useTheme();

  let getClassName = (classes) => {
    return `${classes} ${theme === "dark" ? "light-font" : "dark-font"}`;
  }

  return (
    <div className={`menu ${theme === 'dark' ? 'menu-dark-theme' : 'menu-light-theme'}`}>
      <div className="logo">
        <div className="logo-img"></div>
        <div className="logo-title"></div>
      </div>
      <div className="menu-inner-frame">
        <div className="menu-section">
          <div className="menu-item">
            <i className={getClassName('menu-item-icon fa-solid fa-calendar-days')}></i>
            <Link className={getClassName('menu-item-desc')} to="/month">
              Month
            </Link>
          </div>

          <div className="menu-item">
            <i className={getClassName('menu-item-icon fa-solid fa-calendar-week')}></i>
            <Link className={getClassName('menu-item-desc')} to="/week">
              Week
            </Link>
          </div>

          <div className="menu-item">
            <i className={getClassName('menu-item-icon fa-regular fa-calendar-plus')}></i>
            <Link className={getClassName('menu-item-desc')} to="/agenda">
              Agenda
            </Link>
          </div>
        </div>

        <div className="menu-section">
          <div className="menu-item">
            <i className={getClassName('menu-item-icon fa-solid fa-gear')}></i>
            <Link className={getClassName('menu-item-desc')} to="/settings">
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
