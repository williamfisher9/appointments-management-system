import { Link } from 'react-router-dom';
import './CollapsibleMenu.css';
import { useTheme } from '../ThemeContext/ThemeContext';

function CollapsibleMenu() {
    const {theme, toggletheme} = useTheme();

    let handleLinkClick = (event) => {

    }

    return <div className={`collapsible-menu ${theme === 'dark' ? 'menu-dark-theme' : 'menu-light-theme'}`} >
            <Link to="/month" className={`collapsible-menu-item ${theme === "dark" ? "dark-theme-font" : "light-theme-font"}`} onClick={handleLinkClick}>
              <i className='menu-item-icon fa-solid fa-calendar-days'></i>
              <span >Month</span>
            </Link>

            <Link to="/week" className={`collapsible-menu-item ${theme === "dark" ? "dark-theme-font" : "light-theme-font"}`} onClick={handleLinkClick}>
              <i className='menu-item-icon fa-solid fa-calendar-week'></i>
              <span >Week</span>
            </Link>

            <Link to="/agenda" className={`collapsible-menu-item ${theme === "dark" ? "dark-theme-font" : "light-theme-font"}`} onClick={handleLinkClick}>
              <i className='menu-item-icon fa-regular fa-calendar-plus'></i>
              <span >Agenda</span>
            </Link>
        

            <Link to="/settings" className={`collapsible-menu-item ${theme === "dark" ? "dark-theme-font" : "light-theme-font"}`} onClick={handleLinkClick}>
              <i className='menu-item-icon fa-solid fa-gear'></i>
              <span >Settings</span>
            </Link>
    </div>
}

export default CollapsibleMenu;