import { useEffect, useState } from "react";
import { useAppointmentsContext } from "../AppointmentsContext/AppointmentsContext";
import { useTheme } from "../ThemeContext/ThemeContext";
import './Appointment.css'
import { useSearchContext } from "../SearchContext/SearchContext";

function Appintment(){
    let { appointments, setAppointments } = useAppointmentsContext();
    let { searchAppointments, setSearchAppointments } = useSearchContext();

    let {theme} = useTheme();

    useEffect(() => {
      setSearchAppointments(appointments);
    }, [appointments])
    
    let handleDeleteAppointment = (itemId) => {``
      let newAppointments = [];

      for(let i = 0; i < appointments.length; i++){
        if(appointments[i].uuid !== itemId){
          newAppointments.push(appointments[i]);
        } 
      }

      setAppointments([...newAppointments]);

    }

    let handleSearchFieldChange = (event) => {
      let newAppointments = [];

      for(let i = 0; i < appointments.length; i++){
        if(appointments[i].date.includes(event.target.value) || appointments[i].session.includes(event.target.value) || appointments[i].name.toUpperCase().includes(event.target.value.toUpperCase())){
          newAppointments.push(appointments[i]);
        } 
      }

      setSearchAppointments([...newAppointments]);
    }

    return <div className="appointments-container">

          <div className="search-div">
            <input className="search-field" type="text" onChange={handleSearchFieldChange} />
            <span className="search-field-icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
          </div>

          <table className="appointments-grid">
          <thead>
            <tr>
            <td>DATE</td><td>TIME</td><td>NAME</td><td>PHONE</td><td>DETAILS</td><td>ACTIONS</td>
            </tr>
          </thead>
          <tbody>
          {
              searchAppointments.map((element) => {
                return <tr key={element.uuid} className={theme === 'dark' ? 'dark-theme-font' : 'light-theme-font'}>
                <td>{element.date}</td>
                <td>{element.session}</td>
                <td>{element.name}</td>
                <td>{element.phone}</td>
                <td>{element.description}</td>
                <td>
                  <i className="action-icon fa-regular fa-trash-can" onClick={() => handleDeleteAppointment(element.uuid)} title="Delete"></i>
                  <i className="action-icon fa-regular fa-copy" onClick={() => handleDeleteAppointment(element.uuid)} title="Copy"></i>
                  <i className="action-icon fa-regular fa-pen-to-square" onClick={() => handleDeleteAppointment(element.uuid)} title="Edit"></i>
                </td>
                </tr>
              })
            }
          </tbody>
          </table>

          <div className="appointments-cards">
            {
              searchAppointments.map((element) => {
                return <div key={element.uuid} className={theme === 'dark' ? 'card dark-theme-font' : 'card light-theme-font'}>
                    <h2>{element.name}</h2>
                    <p>{element.date}</p>
                    <p>{element.session}</p>
                    <p>{element.phone}</p>
                    <p>{element.description}</p>
                    <div>
                    <i className="action-icon fa-regular fa-trash-can" onClick={() => handleDeleteAppointment(element.uuid)} title="Delete"></i>
                  <i className="action-icon fa-regular fa-copy" onClick={() => handleCopyAppointment(element.uuid)} title="Copy"></i>
                  <i className="action-icon fa-regular fa-pen-to-square" onClick={() => handleEditAppointment(element.uuid)} title="Edit"></i>
                    </div>
                  </div>
              })
            }
          </div>
    </div>
}

export default Appintment;