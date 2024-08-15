import { useRef, useState } from 'react';
import './CopyModal.css'
import useOnClickOutside from '../CustomHooks/CustomHooks';
import { useAppointmentsContext } from '../AppointmentsContext/AppointmentsContext';
import CalendarGrid from '../CalendarGrid/CalendarGrid';
import SessionsGrid from '../SessionsGrid/SessionsGrid';

function CopyModal({ uuid, name, phone, session, date, description, onClose }) { 
  
  let [newDate, setNewDate] = useState(date);
  let [newDescription, setNewDescription] = useState(description);
  let [newSession, setNewSession] = useState(session);

  let [showError, setShowError] = useState({show: false, message: ''});
  
    let modalRef = useRef();

    let {appointments, setAppointments} = useAppointmentsContext();
    
    useOnClickOutside(modalRef, onClose);

    let handleCopyButton = () => {
      if (date === newDate && session === newSession) {
        setShowError({ show: true, message: "Session exists." });
        return;
      }

      if (newDate === "" || newSession === "") {
        setShowError({
          show: true,
          message: "Date and session fields required.",
        });
        return;
      }

      setAppointments([
        ...appointments,
        {
          uuid: crypto.randomUUID(),
          name,
          phone,
          session: newSession,
          date: newDate,
          description: newDescription,
        },
      ]);

      onClose();
    };

    const calendarDivRef = useRef()
    const sessionsDivRef = useRef();

    let handleShowCalendarClick = () => {
      if(calendarDivRef.current.classList.contains('show-copy-modal-calendar')){
        calendarDivRef.current.classList.remove('show-copy-modal-calendar');
      } else {
        calendarDivRef.current.classList.add('show-copy-modal-calendar');
        sessionsDivRef.current.classList.remove('show-sessions-div');
      }
    }

    let handleShowAvailableSessions = () => {
      if(sessionsDivRef.current.classList.contains('show-sessions-div')){
        sessionsDivRef.current.classList.remove('show-sessions-div');
      } else {
        sessionsDivRef.current.classList.add('show-sessions-div');
        calendarDivRef.current.classList.remove('show-copy-modal-calendar');
      }
    }

    let handleMonthItemClick = (event) => {
      setNewDate(`${new Date(date).getMonth()+1}/${event}/${new Date(date).getFullYear()}`)
      document.querySelector('.copy-modal-calendar').classList.toggle('show-copy-modal-calendar');
    }

    let handleDescriptionChange = (event) => {
      setNewDescription(event.target.value);
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

            <input className='copy-modal-control' type='text' value={newDate} 
            onClick={handleShowCalendarClick} onChange={() => {}}/>

            <div className='copy-modal-calendar' ref={calendarDivRef}>
              <CalendarGrid
                selectedDateIn={newDate}
                yearIn={new Date(date).getFullYear()}
                monthIn={new Date(date).getMonth()}
                dayIn={new Date(date).getDate()}
                handleMonthItemClick={handleMonthItemClick}
                size='small'
              />
            </div>

          </div>
          <div className='available-sessions-div'>
            <input className='copy-modal-control' type='text' value={newSession} onClick={handleShowAvailableSessions}/>
            <div className="sessions-div" ref={sessionsDivRef}>
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
          <input className='copy-modal-control' type='textarea' value={newDescription} onChange={handleDescriptionChange}/>

          <div className='buttons'>
          <input type='button' className='btn' value='COPY' onClick={handleCopyButton}/>
          <input type='button' className='btn' value='CANCEL' onClick={onClose}/>
          </div>

          {showError.show && <p style={{color: "red"}}>{showError.message}</p>}
        
        </div>
      </div>
    )
  }

export default CopyModal;