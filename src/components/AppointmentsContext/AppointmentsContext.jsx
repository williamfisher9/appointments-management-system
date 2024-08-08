import { createContext, useContext, useEffect, useState } from "react";

const AppointmentsContext = createContext()

export const AppointmentsProvider = ({children}) => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        console.log(appointments)
    }, [appointments])

    return <AppointmentsContext.Provider value={{appointments, setAppointments}}>
        {children}
    </AppointmentsContext.Provider>
}

export const useAppointmentsContext = () => useContext(AppointmentsContext);