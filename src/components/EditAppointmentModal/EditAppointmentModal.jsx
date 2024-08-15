import { useRef, useState } from 'react';
import './EditAppointmentModal.css'
import useOnClickOutside from '../CustomHooks/CustomHooks';
import { useAppointmentsContext } from '../AppointmentsContext/AppointmentsContext';
import CalendarGrid from '../CalendarGrid/CalendarGrid';
import SessionsGrid from '../SessionsGrid/SessionsGrid';

function EditAppointmentModal({ uuid, name, phone, session, date, description, onClose }) { 
  
  let [newDate, setNewDate] = useState(date);
  let [newDescription, setNewDescription] = useState(description);
  let [newSession, setNewSession] = useState(session);
  let [newName, setNewName] = useState(name);
  let [newPhone, setNewPhone] = useState(phone);
  
  let modalRef = useRef();

  useOnClickOutside(modalRef, onClose);

  let {appointments, setAppointments} = useAppointmentsContext();
  
  let handleSaveButton = () => {
    let newAppointments = [];

    for(let i = 0; i < appointments.length; i++){
      if(uuid != appointments[i].uuid){
        newAppointments.push(appointments[i]);
      }
    }
  
    setAppointments([...newAppointments, {uuid, name: newName, phone: newPhone, session: newSession, description: newDescription, date: newDate}]);

    onClose();
  
  }
  

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

    let handleDateChange = (event) => {
      setNewDate(`${new Date(date).getMonth()+1}/${event}/${new Date(date).getFullYear()}`)
      document.querySelector('.copy-modal-calendar').classList.toggle('show-copy-modal-calendar');
    }

    let handleDescriptionChange = (event) => {
      setNewDescription(event.target.value);
    }

    let handleSessionItemClick = (hour, dateVal) => {
      setNewSession(hour)
      document.querySelector('.sessions-div').classList.toggle('show-sessions-div');
    }

    return (
      <div className='copy-modal-container'>
        <div className='copy-modal-box' ref={modalRef}>
          <input className='copy-modal-control disabled-copy-modal-control' type='text' value={newName} onChange={() => setNewName(event.target.value)}/>
          <input className='copy-modal-control disabled-copy-modal-control' type='text' value={newPhone} onChange={() => setNewPhone(event.target.value)}  />
          <div className='copy-modal-date-field'>
            <input className='copy-modal-control' type='text' value={newDate} onClick={handleShowCalendarClick} onChange={() => {selectedDateIn = newDate}}/>

            <div className='copy-modal-calendar' ref={calendarDivRef}>
            <CalendarGrid
              selectedDateIn={newDate}
              yearIn={new Date(date).getFullYear()}
              monthIn={new Date(date).getMonth()}
              dayIn={new Date(date).getDate()}
              handleMonthItemClick={handleDateChange}
              size='small'
            />
            </div>
          </div>
          <div className='available-sessions-div'>
            <input className='copy-modal-control' type='text' value={newSession} onClick={handleShowAvailableSessions} onChange={() => {}}/>
            <div className="sessions-div" ref={sessionsDivRef}>
              <SessionsGrid
                selectedDateIn={newDate != '' ? newDate : date}
                yearIn={new Date(date).getFullYear()}
                monthIn={new Date(date).getMonth()}
                dayIn={new Date(date).getDate()}
                size='small'
                handleBookSessionClick={handleSessionItemClick}
              />
            </div>
          </div>
          <input className='copy-modal-control' type='textarea' value={newDescription}  onChange={handleDescriptionChange}/>

          <div className='buttons'>
          <input type='button' className='btn' value='SAVE' onClick={handleSaveButton}/>
          <input type='button' className='btn' value='CANCEL' onClick={onClose}/>
          </div>
        </div>


        
      </div>
    )
  }

export default EditAppointmentModal;