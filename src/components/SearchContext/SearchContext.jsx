import { createContext, useContext, useState } from "react"

const SearchContext = createContext();

export const SearchContextProvider = ({children}) => {
    let [searchAppointments, setSearchAppointments] = useState([]);

    return <SearchContext.Provider value={{searchAppointments, setSearchAppointments}}>
        {children}
    </SearchContext.Provider>
}

export const useSearchContext = () => useContext(SearchContext);