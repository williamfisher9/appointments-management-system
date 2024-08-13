import { useRef } from 'react';
import './CopyModal.css'
import useOnClickOutside from '../CustomHooks/CustomHooks';
import { useAppointmentsContext } from '../AppointmentsContext/AppointmentsContext';
import CalendarGrid from '../CalendarGrid/CalendarGrid';

function CopyModal({ uuid, name, phone, session, date, description, onClose }) {     
  console.log(name)   
    let modalRef = useRef();

    let {appointments, setAppointments} = useAppointmentsContext();
    
    useOnClickOutside(modalRef, onClose);

    let handleCopyButton = () => {
      setAppointments([...appointments, {uuid: crypto.randomUUID(), name, phone, session, date, description}]);
      onClose();
    }

    let handleShowCalendarClick = (event) => {
      console.log("test")
      document.querySelector('.copy-modal-calendar').classList.toggle('show-copy-modal-calendar');
    }

    return (
      <div className='copy-modal-container'>
        <div className='copy-modal-box' ref={modalRef}>
          <input className='copy-modal-control' type='text' value={name} onChange={handleShowCalendarClick}/>
          <input className='copy-modal-control' type='text' value={phone}  onChange={handleShowCalendarClick}/>
          <div className='copy-modal-date-field'>
            <input className='copy-modal-control' type='text' value={date} onClick={handleShowCalendarClick}/>
            <div className='copy-modal-calendar'>
            <CalendarGrid
          selectedDateIn={date}
          yearIn={new Date(date).getFullYear()}
          monthIn={new Date(date).getMonth()}
          dayIn={new Date(date).getDate()}

          size='small'
        />
            </div>
          </div>
          <input className='copy-modal-control' type='text' value={session}  onChange={handleShowCalendarClick}/>
          <input className='copy-modal-control' type='textarea' value={description}  onChange={handleShowCalendarClick}/>

          <div className='buttons'>
          <input type='button' className='btn' value='COPY' onClick={handleCopyButton}/>
          <input type='button' className='btn' value='CANCEL' onClick={onClose}/>
          </div>
        </div>
      </div>
    )
  }

export default CopyModal;