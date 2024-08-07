import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

let SettingsContext = createContext({});

export function SettingsContextProvider({children}){
    let [settings, setSettings] = useState({duration: "1", from: "09:00", to: "17:00", weekends: "1"})
    return <SettingsContext.Provider value={{settings, setSettings}}>
        {children}
    </SettingsContext.Provider>
}

export let useSettingsContext = () => useContext(SettingsContext);