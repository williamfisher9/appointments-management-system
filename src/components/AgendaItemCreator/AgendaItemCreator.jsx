import { useState } from 'react'
import './AgendaItemCreator.css'
import { useAppointmentsContext } from '../AppointmentsContext/AppointmentsContext'; 

function AgendaItemCreator(props) {
    let [appointment, setAppointment] = useState({});

    let {appointments, setAppointments} = useAppointmentsContext();

    let handleModalContainerClick = (event) => {
        if(event.target.id === 'modalContainer'){
            props.hideModal()
        }
    }

    let handleChange = (event) => {
        setAppointment({ ...appointment, [event.target.name]: event.target.value, date: props.dateValue, session: props.hourValue });
    }

    let handleButtonClick = () => {
        setAppointments([...appointments, appointment])
        props.hideModal();
    }

    return props.showModal ? 
        <div className='modal-container' onClick={handleModalContainerClick} id="modalContainer">
            <div className="modal-box" id="modalBox">
                <input className='agenda-item-control' type='text' value={props.dateValue} disabled={props.disabled} />

                <input className='agenda-item-control' type='text' onChange={handleChange} placeholder='Full Name' name='name'/>
                <input className='agenda-item-control' type='text' onChange={handleChange} placeholder='Phone Number' name='phone'/>



                <textarea className='agenda-item-control' onChange={handleChange}  placeholder='Description...' name='description'/>
                <input className='agenda-item-control' type='button' onClick={handleButtonClick} value='SAVE' />
            </div>
        </div>
        : null
    
}

export default AgendaItemCreator;