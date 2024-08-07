import { Link } from "react-router-dom";
import "./Menu.css";

import LogoIcon from "../LogoImages/Icon"; 
import LogoTitle from "../LogoImages/Title";

import { useTheme } from "../ThemeContext/ThemeContext";
import CollapsibleMenu from "../CollapsibleMenu/CollapsibleMenu";
import { useState } from "react";

function Menu() {
  const { theme, toggleTheme } = useTheme();
  const [showCollapsibleMenu, setShowCollapsibleMenu] = useState(false);


  let handleCollapsibleMenu = () => {
    showCollapsibleMenu ? setShowCollapsibleMenu(false) : setShowCollapsibleMenu(true);
  }

  let getClassName = (classes) => {
    return `${classes} ${theme === "dark" ? "dark-theme-font" : "light-theme-font"}`;
  }

  let handleClick = () => {
    if (theme == "dark") {
      toggleTheme("light")
    } else {
      toggleTheme("dark");
    }
  };

  return (<>
    <div className={`menu ${theme === 'dark' ? 'menu-dark-theme' : 'menu-light-theme'}`}>
      
      <div className="menu-inner-frame">
      <div className="bars-icon" onClick={handleCollapsibleMenu}>
        <i className={`fa-solid fa-bars ${theme === "dark" ? "dark-theme-font" : "light-theme-font"}`}></i>
      </div>
      <div className="logo">
        <div className={`logo-img ${theme === 'light' ? 'logo-icon-light-props' : null}`}>
          <LogoIcon />
        </div>
        <div className={`logo-title ${theme === 'light' ? 'logo-icon-light-props' : null}`}>
          <LogoTitle />
        </div>
      </div>


      <div className="bars-icon" onClick={handleClick}>
      <i className={`${getClassName("fa-regular")} ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
      </div>
      


        <div className="menu-section">
          
            
            <Link className={getClassName('menu-item')} to="/month">
              <i className={getClassName('menu-item-icon fa-solid fa-calendar-days')}></i>
              <span className={getClassName('menu-item-desc')}>Month</span>
            </Link>

            <Link className={getClassName('menu-item')} to="/week">
              <i className={getClassName('menu-item-icon fa-regular fa-clock')}></i>
              <span className={getClassName('menu-item-desc')}>Week</span>
            </Link>

            <Link className={getClassName('menu-item')} to="/agenda">
            <i className={getClassName('menu-item-icon fa-regular fa-calendar-check')}></i>
              <span className={getClassName('menu-item-desc')}>Tabular</span>
            </Link>
        


        
        </div>
        <div className="menu-section">

        <Link className={getClassName('menu-item')} to="/settings">
              <i className={getClassName('menu-item-icon fa-solid fa-gear')}></i>
              <span className={getClassName('menu-item-desc')}>Settings</span>
            </Link>


          
          </div>
      </div>
    </div>

    {showCollapsibleMenu ? <CollapsibleMenu /> : null}
    
    </>
  );
}

export default Menu;
