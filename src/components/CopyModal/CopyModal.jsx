import { useRef, useState } from 'react';
import './CopyModal.css'
import useOnClickOutside from '../CustomHooks/CustomHooks';
import { useAppointmentsContext } from '../AppointmentsContext/AppointmentsContext';
import CalendarGrid from '../CalendarGrid/CalendarGrid';
import SessionsGrid from '../SessionsGrid/SessionsGrid';

function CopyModal({ uuid, name, phone, session, date, description, onClose }) { 
  
  let [newDate, setNewDate] = useState('');
  let [newTextArea, setNewTextArea] = useState('');

  let [showError, setShowError] = useState(false);

  let [newSession, setNewSession] = useState('');
  
    let modalRef = useRef();

    let {appointments, setAppointments} = useAppointmentsContext();
    
    useOnClickOutside(modalRef, onClose);

    let handleCopyButton = () => {
      if(newDate === '' || newSession === '')
        setShowError(true)
      else
        {setAppointments([...appointments, {uuid: crypto.randomUUID(), name, phone, session: newSession != null ? newSession : session, date: newDate != null ? newDate : date, description: newTextArea != '' ? newTextArea : description}]);
      
        onClose();}
    }

    let handleShowCalendarClick = () => {
      document.querySelector('.copy-modal-calendar').classList.toggle('show-copy-modal-calendar');
    }

    let handleShowAvailableSessions = () => {
      document.querySelector('.sessions-div').classList.toggle('show-sessions-div');
    }

    let handleMonthItemClick = (event) => {
      setNewDate(`${new Date(date).getMonth()+1}/${event}/${new Date(date).getFullYear()}`)
      document.querySelector('.copy-modal-calendar').classList.toggle('show-copy-modal-calendar');
    }

    let handleTextAreaChange = (event) => {
      setNewTextArea(event.target.value);
    }

    let handleBookSessionClick = (hour, dateVal) => {
      setNewSession(hour)
      document.querySelector('.sessions-div').classList.toggle('show-sessions-div');
    }

    let handleContainerClick = () => {
      console.log('click')
    }

    return (
      <div className='copy-modal-container'>
        <div className='copy-modal-box' ref={modalRef} onClick={handleContainerClick}>
          <input className='copy-modal-control disabled-copy-modal-control' type='text' value={name} disabled/>
          <input className='copy-modal-control disabled-copy-modal-control' type='text' value={phone}  disabled/>
          <div className='copy-modal-date-field'>
            <input className='copy-modal-control' type='text' value={newDate != '' ? newDate : date} onClick={handleShowCalendarClick} onChange={() => {selectedDateIn = newDate}}/>

            <div className='copy-modal-calendar'>
            <CalendarGrid
              selectedDateIn={newDate != '' ? newDate : date}
              yearIn={new Date(date).getFullYear()}
              monthIn={new Date(date).getMonth()}
              dayIn={new Date(date).getDate()}
              handleMonthItemClick={handleMonthItemClick}
              size='small'
            />
            </div>
          </div>
          <div className='available-sessions-div'>
            <input className='copy-modal-control' type='text' value={newSession != '' ? newSession : session} onClick={handleShowAvailableSessions}/>
            <div className="sessions-div">
              <SessionsGrid
                selectedDateIn={newDate != '' ? newDate : date}
                yearIn={new Date(date).getFullYear()}
                monthIn={new Date(date).getMonth()}
                dayIn={new Date(date).getDate()}
                size='small'
                handleBookSessionClick={handleBookSessionClick}
              />
            </div>
          </div>
          <input className='copy-modal-control' type='textarea' value={newTextArea != '' ? newTextArea : description}  onChange={handleTextAreaChange}/>

          <div className='buttons'>
          <input type='button' className='btn' value='COPY' onClick={handleCopyButton}/>
          <input type='button' className='btn' value='CANCEL' onClick={onClose}/>
          </div>
          {showError && <p style={{color: "red"}}>The same session exists!</p>}
        </div>


        
      </div>
    )
  }

export default CopyModal;