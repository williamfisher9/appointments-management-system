import { useEffect, useState } from "react";
import "./Calendar.css";
import MonthSelector from "../MonthSelector/MonthSelector";

import { useTheme } from "../ThemeContext/ThemeContext";
import { useSettingsContext } from "../SettingsContext/SettingsContext";
import AppointmentCreator from "../AppointmentCreator/AppointmentCreator";

function Calendar() {
  const { theme } = useTheme();

  let [monthState, setMonthState] = useState({sessions: [], day: new Date().getDate(), month: new Date().getMonth(), year: new Date().getFullYear(), 
    showModal: false, selectedDate: new Date().toLocaleDateString(), showMonthSelector: false, selectedSession: ''});

    useEffect(() => {
      setMonthState({...monthState, sessions: getAvailableSessions(new Date())})
    }, []);

  let {settings} = useSettingsContext();

  let date = new Date();

  let options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
  }, [monthState])


  let handleMonthItemClick = (val) => {
    setMonthState({...monthState, day: val, selectedDate: new Date(monthState.year, monthState.month, val).toLocaleDateString(), sessions: getAvailableSessions(new Date(monthState.year, monthState.month, val))});
  };

  let hideModal = () => {
    setMonthState({...monthState, showModal: false, sessions: getAvailableSessions(new Date(monthState.year, monthState.month, monthState.day))});
  };

  let hideMonthSelector = () => {
    setMonthState({...monthState, showMonthSelector: false})
  };

  let getAvailableSessions = (dateVal) => {

    let val = [];
    let i = 0;

    const lastSession = parseInt(settings.lastSession);

    let startTimeInMinutes = parseInt(settings.from.split(':')[0])*60 + parseInt(settings.from.split(':')[1]);
    let endTimeInMinutes = parseInt(settings.to.split(':')[0])*60 + parseInt(settings.to.split(':')[1]);

    

    if(settings.duration === "1"){
      if(lastSession === 1) {
        while(startTimeInMinutes <= endTimeInMinutes) {    
          let hourVal = `${parseInt(startTimeInMinutes/60).toString().padStart(2,'0')}:${(startTimeInMinutes%60).toString().padStart(2,'0')}`;  
          val.push(<span onClick={() => handleBookSessionClick(hourVal, dateVal)} 
          
          key={i++} className="session-item">{hourVal}</span>);
          startTimeInMinutes += 60;
        }
      } else {
        while(startTimeInMinutes < endTimeInMinutes) {
          let hourVal = `${parseInt(startTimeInMinutes/60).toString().padStart(2,'0')}:${(startTimeInMinutes%60).toString().padStart(2,'0')}`;
          val.push(<span onClick={() => handleBookSessionClick(hourVal, dateVal)} key={i++} className="session-item">{hourVal}</span>);
          startTimeInMinutes += 60;
        }
      }
    }

    if(settings.duration === "2"){
      if(lastSession === 1) {
        while(startTimeInMinutes <= endTimeInMinutes) {
          let hourVal = `${parseInt(startTimeInMinutes/60).toString().padStart(2,'0')}:${(startTimeInMinutes%60).toString().padStart(2,'0')}`;
          val.push(<span onClick={() => handleBookSessionClick(hourVal, dateVal)} key={i++} className="session-item">{hourVal}</span>);
          startTimeInMinutes += 30;
        }
      } else {
        while(startTimeInMinutes < endTimeInMinutes) {
          let hourVal = `${parseInt(startTimeInMinutes/60).toString().padStart(2,'0')}:${(startTimeInMinutes%60).toString().padStart(2,'0')}`;
          val.push(<span onClick={() => handleBookSessionClick(hourVal, dateVal)} key={i++} className="session-item">{hourVal}</span>);
          startTimeInMinutes += 30;
        }
      }
    }

    return val;
  }

  let handleBookSessionClick = (hour, dateVal) => {
    setMonthState({...monthState, selectedDate: dateVal.toLocaleDateString(), showModal: true, selectedSession: hour, day: dateVal.getDate()});
  }

  let buildCalendarItems = () => {
    let values = [];
    let keyVal = 1;

    let weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

    values.push(
      <div className="calendar-item week-day-name" key={keyVal++} style={theme === 'dark' ? {border: "1px solid #fff", color: "#fff", WebkitTextStrokeColor: "#fff"} : {border: "1px solid #000", color:"#000", WebkitTextStrokeColor: "#000"}}>
        {weekDays[0]}
      </div>
    );
    values.push(
      <div className="calendar-item week-day-name" key={keyVal++} style={theme === 'dark' ? {border: "1px solid #fff", color: "#fff", WebkitTextStrokeColor: "#fff"} : {border: "1px solid #000", color:"#000", WebkitTextStrokeColor: "#000"}}>
        {weekDays[1]}
      </div>
    );
    values.push(
      <div className="calendar-item week-day-name" key={keyVal++} style={theme === 'dark' ? {border: "1px solid #fff", color: "#fff", WebkitTextStrokeColor: "#fff"} : {border: "1px solid #000", color:"#000", WebkitTextStrokeColor: "#000"}}>
        {weekDays[2]}
      </div>
    );
    values.push(
      <div className="calendar-item week-day-name" key={keyVal++} style={theme === 'dark' ? {border: "1px solid #fff", color: "#fff", WebkitTextStrokeColor: "#fff"} : {border: "1px solid #000", color:"#000", WebkitTextStrokeColor: "#000"}}>
        {weekDays[3]}
      </div>
    );
    values.push(
      <div className="calendar-item week-day-name" key={keyVal++} style={theme === 'dark' ? {border: "1px solid #fff", color: "#fff", WebkitTextStrokeColor: "#fff"} : {border: "1px solid #000", color:"#000", WebkitTextStrokeColor: "#000"}}>
        {weekDays[4]}
      </div>
    );
    values.push(
      <div className="calendar-item week-day-name" key={keyVal++} style={theme === 'dark' ? {border: "1px solid #fff", color: "#fff", WebkitTextStrokeColor: "#fff"} : {border: "1px solid #000", color:"#000", WebkitTextStrokeColor: "#000"}}>
        {weekDays[5]}
      </div>
    );
    values.push(
      <div className="calendar-item week-day-name" key={keyVal++}style={theme === 'dark' ? {border: "1px solid #fff", color: "#fff", WebkitTextStrokeColor: "#fff"} : {border: "1px solid #000", color:"#000", WebkitTextStrokeColor: "#000"}}>
        {weekDays[6]}
      </div>
    );

    // returns the day number for the first day of the month
    let firstDayOfTheMonth = firstDayOfMonth(monthState.month, monthState.year);

    let numberOfDaysInPreviousMonth = numberOfDaysInMonth(monthState.month, monthState.year);
    
    let nextMonthDates = 1;

    for (
      let i = 1 - firstDayOfTheMonth;
      i <= 42-firstDayOfTheMonth;
      i++
    ) {
      if (i < 1) {
        values.push(
        <div
            className={`disabled-calendar-item`}
            key={keyVal++}
          >
            {numberOfDaysInPreviousMonth + i}
        </div>
        );
        
      } else if (i > numberOfDaysInMonth(monthState.month + 1, monthState.year)){

        values.push(<div
            className={`disabled-calendar-item`}
            key={keyVal++}
          >
            {nextMonthDates++}
            </div>);

      } else if (new Date(monthState.year, monthState.month, i+1) < new Date()){

        values.push(<div
            className={`disabled-calendar-item`}
            key={keyVal++}
          >
            {nextMonthDates++}
            </div>);

      } else if ((settings.weekends === '1' && new Date(monthState.year, monthState.month, i+1).getDay() === 0) || 
      (settings.weekends === '1' && new Date(monthState.year, monthState.month, i+1).getDay() === 1) || 
      (settings.weekends === '2' && new Date(monthState.year, monthState.month, i+1).getDay() === 6) || 
      (settings.weekends === '2' && new Date(monthState.year, monthState.month, i+1).getDay() === 0) || 
      (settings.weekends === '3' && new Date(monthState.year, monthState.month, i+1).getDay() === 6) || 
      (settings.weekends === '4' && new Date(monthState.year, monthState.month, i+1).getDay() === 0) || 
      (settings.weekends === '5' && new Date(monthState.year, monthState.month, i+1).getDay() === 1)){

        if(settings.weekends === '1'){

        }

        values.push(<div
            className={`disabled-calendar-item`}
            key={keyVal++}
          >
            {nextMonthDates++}
            </div>);

      } 
      else {
        values.push(
          <div
            className={`calendar-item ${monthState.selectedDate === new Date(monthState.year, monthState.month, i).toLocaleDateString() ? 'current-calendar-item' : null}`}
            key={keyVal++}
            onClick={() => handleMonthItemClick(i)}
            style={theme === 'dark' ? {border: "1px solid #fff", color: "#fff"} : {border: "1px solid #000", color:"#000"}}
          >
              {date.toLocaleDateString("en-US", options) === `${monthState.month + 1}/${i}/${monthState.year}` ? <><span style={{fontSize: "10px", fontWeight: "500"}}>Today</span><br /></> : null}
            {i}
          </div>
        );
      }
    }

    return values;
  };

  let firstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };


  let numberOfDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  let handlePlus = () => {
    if (monthState.month == 11) {
      setMonthState({...monthState, month: 0, year: ++monthState.year})
    } else {
      setMonthState({...monthState, month: ++monthState.month})
    }
  };

  let handleMinus = () => {
    if (monthState.month == 0) {
      setMonthState({...monthState, month: 11, year: --monthState.year})
    } else {
      setMonthState({...monthState, month: --monthState.month})
    }
  };

  let handleYearTextChange = (event) => {
    setMonthState({...monthState, year: event.target.value})
  };

  let handleShowMonthSelector = () => {
    setMonthState({...monthState, showMonthSelector: true})
  };

  let setMonthValue = (val) => {
    setMonthState({...monthState, showMonthSelector: false, month: val})
  };

  let handlePlusYearIcon = () => {
    setMonthState({...monthState, year: ++monthState.year})
  };

  let handleMinusYearIcon = () => {
    setMonthState({...monthState, year: --monthState.year})
  };

  let handleJumpToTodayClick = () => {
    setMonthState({...monthState, year: new Date().getFullYear(), 
      month: new Date().getMonth(), 
      day: new Date().getDate(), 
      selectedDate: new Date().toLocaleDateString(),
      sessions: getAvailableSessions(new Date())})
  }

  return (
    <div className="calendar-container">
      <div className="text-field-container">
        <input
          className="text-field"
          type="text"
          value={monthState.year}
          onChange={handleYearTextChange}
          style={theme === 'dark' ? {WebkitTextStrokeColor: "#fff"} : {WebkitTextStrokeColor: "#000"}}
        />
        <div className="plus-icon" onClick={handlePlusYearIcon}>
          <i className="fa-solid fa-chevron-up"></i>
        </div>
        <div className="minus-icon" onClick={handleMinusYearIcon}>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </div>

      <div className="month-control" style={theme === 'dark' ? {WebkitTextStrokeColor: "#fff"} : {WebkitTextStrokeColor: "#000"}}>
        <div className="month-control-item" onClick={handleMinus}>
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div className="month-control-item" onClick={handleShowMonthSelector}>
          {months[monthState.month]}
        </div>
        <div className="month-control-item" onClick={handlePlus}>
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>     
      
      <div className="grid-components">
      <div className="calendar-grid" style={theme === 'dark' ? {border: "1px solid #fff", color: "#fff"} : {border: "1px solid #000", color:"#000"}}>
        {buildCalendarItems()}
      </div>

      <div className="sessions-grid" style={theme === 'dark' ? {border: "1px solid #fff", color: "#fff"} : {border: "1px solid #000", color:"#000"}}>
      <span className="selected-date-field selected-date-text-field" style={theme === 'dark' ? {color: "#fff"} : {color:"#000"}}>
          AVAILABLE SESSIONS <span style={{color: "rgba(238, 171, 0, 1)", fontWeight: "600", textDecoration: "underline"}}>{
            
            `${monthState.selectedDate.split("/")[0].padStart(2, '0')}/${monthState.selectedDate.split("/")[1].padStart(2, '0')}/${monthState.selectedDate.split("/")[2]}`
            
            }</span>
          <input className='move-to-today-btn' onClick={handleJumpToTodayClick} type="button" value={"Today"} />
        </span>
        {monthState.sessions}
      </div>
      </div>


      {monthState.showModal ? (
        <AppointmentCreator
          showModal={monthState.showModal}
          hideModal={hideModal}
          dateValue={monthState.selectedDate}
          hourValue={monthState.selectedSession}
          disabled={true}
        />
      ) : null}

      {monthState.showMonthSelector ? (
        <MonthSelector
          showMonthSelector={monthState.showMonthSelector}
          hideMonthSelector={hideMonthSelector}
          setMonthValue={setMonthValue}
        />
      ) : null}
    </div>
  );
}

export default Calendar;
