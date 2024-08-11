import { useState } from 'react'
import './AppointmentCreator.css'
import { useAppointmentsContext } from '../AppointmentsContext/AppointmentsContext';
import { useTheme } from '../ThemeContext/ThemeContext';

function AppointmentCreator(props) {
    let [appointment, setAppointment] = useState({});

    let {appointments, setAppointments} = useAppointmentsContext();

    let {theme} = useTheme();

    let handleModalContainerClick = (event) => {
        if(event.target.id === 'modalContainer'){
            props.hideModal()
        }
    }

    let handleChange = (event) => {
        setAppointment({ ...appointment, [event.target.name]: event.target.value, date: props.dateValue, session: props.hourValue, uuid: crypto.randomUUID() });
    }

    let handleButtonClick = () => {
        setAppointments([...appointments, appointment])
        props.hideModal();
    }

    return props.showModal ? 
        <div className='modal-container' onClick={handleModalContainerClick} id="modalContainer">
            <div className="modal-box" id="modalBox" style={theme === 'dark' ? {backgroundColor: "rgba(0, 0, 0, 1)", boxShadow: "4px 4px 15px #000, -4px -4px 15px #000"} : {backgroundColor: "rgba(238, 171, 0, 1)", boxShadow: "4px 4px 15px #000, -4px -4px 15px #000"}}>
                <input className='agenda-item-control' type='text' value={props.dateValue} disabled={props.disabled} />

                <input className='agenda-item-control' type='text' onChange={handleChange} placeholder='Full Name' name='name'/>
                <input className='agenda-item-control' type='text' onChange={handleChange} placeholder='Phone Number' name='phone'/>



                <textarea className='agenda-item-control' onChange={handleChange}  placeholder='Description...' name='description'/>
                <input className='agenda-item-control' type='button' onClick={handleButtonClick} value='SAVE' 
                style={theme === 'dark' ? {backgroundColor: "rgba(238, 171, 0, 1)" } : {backgroundColor: "rgba(0, 0, 0, 1)"}}/>
            </div>
        </div>
        : null
    
}

export default AppointmentCreator;