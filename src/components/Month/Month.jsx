import { useEffect, useState } from "react";
import "./Month.css";
import AgendaItemCreator from "../AgendaItemCreator/AgendaItemCreator";
import MonthSelector from "../MonthSelector/MonthSelector";

import { useTheme } from "../ThemeContext/ThemeContext";

function Month() {
  const { theme, toggleTheme } = useTheme();

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

  let [day, setDay] = useState(0);
  let [month, setMonth] = useState(0);
  let [year, setYear] = useState(date.getFullYear());
  let [showModal, setShowModal] = useState(false);

  let [showMonthSelector, setShowMonthSelector] = useState(false);

  useEffect(() => {
    setMonth(date.getMonth());
  }, []);

  let handleMonthItemClick = (val) => {
    setShowModal(true);
    setDay(val);
  };

  let hideModal = () => {
    setShowModal(false);
  };

  let hideMonthSelector = () => {
    setShowMonthSelector(false);
  };

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
    let firstDayOfTheMonth = firstDayOfMonth(month, year);

    let numberOfDaysInPreviousMonth = numberOfDaysInMonth(month, year);
    
    let nextMonthDates = 1;

    for (
      let i = 1 - firstDayOfTheMonth;
      i <= 42-firstDayOfTheMonth;
      i++
    ) {
      if (i < 1) {
        values.push(<div
            className={`disabled-calendar-item`}
            key={keyVal++}
          >
            {numberOfDaysInPreviousMonth + i}
        </div>);
        
      } else if (i > numberOfDaysInMonth(month + 1, year)){

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
            className={`calendar-item ${
              date.toLocaleDateString("en-US", options) ===
              `${month + 1}/${i}/${year}`
                ? "current-calendar-item"
                : null
            }`}
            key={keyVal++}
            onClick={() => handleMonthItemClick(i)}
            style={theme === 'dark' ? {border: "1px solid #fff", color: "#fff"} : {border: "1px solid #000", color:"#000"}}
          >
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
    if (month == 11) {
      setMonth(0);
      setYear(++year);
    } else {
      setMonth(++month);
    }
  };

  let handleMinus = () => {
    if (month == 0) {
      setMonth(11);
      setYear(--year);
    } else {
      setMonth(--month);
    }
  };

  let handleYearTextChange = (event) => {
    setYear(event.target.value);
    console.log(event.target.value);
  };

  let handleShowMonthSelector = () => {
    setShowMonthSelector(true);
  };

  let setMonthValue = (val) => {
    setMonth(val);
    setShowMonthSelector(false);
  };

  let handlePlusYearIcon = () => {
    setYear(++year);
  };

  let handleMinusYearIcon = () => {
    setYear(--year);
  };

  return (
    <div className="month-container">
      <div className="text-field-container">
        <input
          className="text-field"
          type="text"
          value={year}
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
          {months[month]}
        </div>
        <div className="month-control-item" onClick={handlePlus}>
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>
      <div className="calendar-grid" style={theme === 'dark' ? {border: "1px solid #fff", color: "#fff"} : {border: "1px solid #000", color:"#000"}}>{buildCalendarItems()}</div>
      {showModal ? (
        <AgendaItemCreator
          showModal={showModal}
          hideModal={hideModal}
          dateValue={`${month + 1}/${day}/${year}`}
          disabled={true}
        />
      ) : null}

      {showMonthSelector ? (
        <MonthSelector
          showMonthSelector={showMonthSelector}
          hideMonthSelector={hideMonthSelector}
          setMonthValue={setMonthValue}
        />
      ) : null}
    </div>
  );
}

export default Month;
