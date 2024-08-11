import { Link } from 'react-router-dom';
import './CollapsibleMenu.css';
import { useTheme } from '../ThemeContext/ThemeContext';

function CollapsibleMenu(props) {
    const {theme, toggletheme} = useTheme();

    let handleLinkClick = () => {
      props.handleCollapsibleMenu();
    }

    return <div className={`collapsible-menu ${theme === 'dark' ? 'menu-dark-theme' : 'menu-light-theme'}`} >
            <Link to="/month" className={`collapsible-menu-item ${theme === "dark" ? "dark-theme-font" : "light-theme-font"}`} onClick={handleLinkClick}>
              <i className='menu-item-icon fa-solid fa-calendar-days'></i>
              <span >Month</span>
            </Link>

            <Link to="/appointments" className={`collapsible-menu-item ${theme === "dark" ? "dark-theme-font" : "light-theme-font"}`} onClick={handleLinkClick}>
              <i className='menu-item-icon fa-regular fa-calendar-plus'></i>
              <span >Appointments</span>
            </Link>
        
            <Link to="/settings" className={`collapsible-menu-item ${theme === "dark" ? "dark-theme-font" : "light-theme-font"}`} onClick={handleLinkClick}>
              <i className='menu-item-icon fa-solid fa-gear'></i>
              <span >Settings</span>
            </Link>
    </div>
}

export default CollapsibleMenu;