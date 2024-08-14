import { useEffect, useRef, useState } from "react";
import { useAppointmentsContext } from "../AppointmentsContext/AppointmentsContext";
import { useTheme } from "../ThemeContext/ThemeContext";
import './Appointment.css'
import { useSearchContext } from "../SearchContext/SearchContext";
import CopyModal from "../CopyModal/CopyModal";
import '../CopyModal/CopyModal.css'
import EditAppointmentModal from "../EditAppointmentModal/EditAppointmentModal";

function Appintment(){
    let { appointments, setAppointments } = useAppointmentsContext();
    let { searchAppointments, setSearchAppointments } = useSearchContext();


    const [copyModalOpen, setCopyModalOpen] = useState({open: false, name: '', date: '', session: '', description: '', phone: '', uuid: ''});

    const [editModalOpen, setEditModalOpen] = useState({open: false, name: '', date: '', session: '', description: '', phone: '', uuid: ''});


    let {theme} = useTheme();

    useEffect(() => {
      setSearchAppointments(appointments);
    }, [appointments]);

    let handleCopyAppointment = (uuid, name, phone, date, session, description) => {
      setCopyModalOpen({...copyModalOpen, open: true, uuid, name, phone, date, session, description});
    }

    let handleEditAppointment = (uuid, name, phone, date, session, description) => {
      setEditModalOpen({...editModalOpen, open: true, uuid, name, phone, date, session, description});
    }
    
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
                  <i className="action-icon fa-regular fa-copy" onClick={() => handleCopyAppointment(element.uuid, element.name, element.phone, element.date, element.session, element.description, element.uuid)} title="Copy"></i>
                  <i className="action-icon fa-regular fa-pen-to-square" 
                  onClick={() => handleEditAppointment(element.uuid, element.name, element.phone, element.date, element.session, element.description, element.uuid)}
                   title="Edit"></i>
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
                  <i className="action-icon fa-regular fa-copy" onClick={() => handleCopyAppointment(element.uuid, element.name, element.phone, element.date, element.session, element.description, element.uuid)} title="Copy"></i>
                  <i className="action-icon fa-regular fa-pen-to-square" 
                  onClick={() => handleEditAppointment(element.uuid, element.name, element.phone, element.date, element.session, element.description, element.uuid)}
                   title="Edit"></i>
                    </div>
                  </div>
              })
            }
          </div>
            {copyModalOpen.open && (
              <CopyModal name={copyModalOpen.name} 
              session={copyModalOpen.session} 
              date={copyModalOpen.date} 
              description={copyModalOpen.description} 
              phone={copyModalOpen.phone} 
              uuid={copyModalOpen.uuid}
              onClose={() => setCopyModalOpen({...copyModalOpen, open: false, name: '', phone:'', session: '', date: '', description: '', uuid: ''})} />
              )}

{editModalOpen.open && (
              <EditAppointmentModal name={editModalOpen.name} 
              session={editModalOpen.session} 
              date={editModalOpen.date} 
              description={editModalOpen.description} 
              phone={editModalOpen.phone} 
              uuid={editModalOpen.uuid}
              onClose={() => setEditModalOpen({...editModalOpen, open: false, name: '', phone:'', session: '', date: '', description: '', uuid: ''})} />
              )}
    </div>
}

export default Appintment;