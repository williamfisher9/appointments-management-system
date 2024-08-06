import "./SocialMediaMenu.css";

import { useTheme } from "../ThemeContext/ThemeContext";

function SocialMediaMenu() {
  const { theme, toggleTheme } = useTheme();

  let handleClick = () => {
    if (theme == "dark") {
      toggleTheme("light")
    } else {
      toggleTheme("dark");
    }
  };

  let getElementClasses = (classes) => {
    return `${classes} ${theme === "dark" ? "dark-theme-font" : "light-theme-font"}`
  }

  return (
    <div className={`social-media-menu ${theme === 'dark' ? 'menu-dark-theme' : 'menu-light-theme'}`}>
      <i className={getElementClasses("social-media-icon fa-regular fa-sun")} onClick={handleClick}></i>
      <i className={getElementClasses("social-media-icon fa-brands fa-square-facebook")}></i>
      <i className={getElementClasses("social-media-icon fa-brands fa-x-twitter")}></i>
      <i className={getElementClasses("social-media-icon fa-brands fa-instagram")}></i>
      <i className={getElementClasses("social-media-icon fa-brands fa-whatsapp")}></i>
    </div>
  );
}

export default SocialMediaMenu;
