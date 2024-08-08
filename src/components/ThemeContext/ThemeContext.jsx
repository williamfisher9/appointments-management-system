import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');

//    useEffect( () => { console.log(theme) }, [theme] )

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
      
        
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);