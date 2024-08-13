import { useEffect, useState } from "react";
import "./Calendar.css";
import MonthSelector from "../MonthSelector/MonthSelector";

import { useTheme } from "../ThemeContext/ThemeContext";
import AppointmentCreator from "../AppointmentCreator/AppointmentCreator";
import CalendarGrid from "../CalendarGrid/CalendarGrid";
import SessionsGrid from "../SessionsGrid/SessionsGrid";

function Calendar() {
  const { theme } = useTheme();

  let [monthState, setMonthState] = useState({
    sessions: [],
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    showModal: false,
    selectedDate: new Date().toLocaleDateString(),
    showMonthSelector: false,
    selectedSession: "",
  });

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

  useEffect(() => {}, [monthState]);

  let handleMonthItemClick = (val) => {
    setMonthState({
      ...monthState,
      day: val,
      selectedDate: new Date(
        monthState.year,
        monthState.month,
        val
      ).toLocaleDateString(),
    });
  };

  let hideModal = () => {
    setMonthState({ ...monthState, showModal: false });
  };

  let hideMonthSelector = () => {
    setMonthState({ ...monthState, showMonthSelector: false });
  };

  let handleBookSessionClick = (hour, dateVal) => {
    setMonthState({
      ...monthState,
      selectedDate: dateVal.toLocaleDateString(),
      showModal: true,
      selectedSession: hour,
      day: dateVal.getDate(),
    });
  };

  let handlePlus = () => {
    if (monthState.month == 11) {
      setMonthState({ ...monthState, month: 0, year: ++monthState.year });
    } else {
      setMonthState({ ...monthState, month: ++monthState.month });
    }
  };

  let handleMinus = () => {
    if (monthState.month == 0) {
      setMonthState({ ...monthState, month: 11, year: --monthState.year });
    } else {
      setMonthState({ ...monthState, month: --monthState.month });
    }
  };

  let handleYearTextChange = (event) => {
    setMonthState({ ...monthState, year: event.target.value });
  };

  let handleShowMonthSelector = () => {
    setMonthState({ ...monthState, showMonthSelector: true });
  };

  let setMonthValue = (val) => {
    setMonthState({ ...monthState, showMonthSelector: false, month: val });
  };

  let handlePlusYearIcon = () => {
    setMonthState({ ...monthState, year: ++monthState.year });
  };

  let handleMinusYearIcon = () => {
    setMonthState({ ...monthState, year: --monthState.year });
  };

  let handleJumpToTodayClick = () => {
    setMonthState({
      ...monthState,
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate(),
      selectedDate: new Date().toLocaleDateString(),
    });
  };

  return (
    <div className="calendar-container">
      <div className="text-field-container">
        <input
          className="text-field"
          type="text"
          value={monthState.year}
          onChange={handleYearTextChange}
          style={
            theme === "dark"
              ? { WebkitTextStrokeColor: "#fff" }
              : { WebkitTextStrokeColor: "#000" }
          }
        />
        <div className="plus-icon" onClick={handlePlusYearIcon}>
          <i className="fa-solid fa-chevron-up"></i>
        </div>
        <div className="minus-icon" onClick={handleMinusYearIcon}>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </div>

      <div
        className="month-control"
        style={
          theme === "dark"
            ? { WebkitTextStrokeColor: "#fff" }
            : { WebkitTextStrokeColor: "#000" }
        }
      >
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
        <CalendarGrid
          selectedDateIn={monthState.selectedDate}
          yearIn={monthState.year}
          monthIn={monthState.month}
          dayIn={monthState.day}
          handleMonthItemClick={handleMonthItemClick}
        />

        <SessionsGrid
          selectedDateIn={monthState.selectedDate}
          yearIn={monthState.year}
          monthIn={monthState.month}
          dayIn={monthState.day}
          handleJumpToTodayClick={handleJumpToTodayClick}
          handleBookSessionClick={handleBookSessionClick}
        />
      </div>

      {monthState.showModal && (
        <AppointmentCreator
          showModal={monthState.showModal}
          hideModal={hideModal}
          dateValue={monthState.selectedDate}
          hourValue={monthState.selectedSession}
          disabled={true}
        />
      )}

      {monthState.showMonthSelector && (
        <MonthSelector
          showMonthSelector={monthState.showMonthSelector}
          hideMonthSelector={hideMonthSelector}
          setMonthValue={setMonthValue}
        />
      )}
    </div>
  );
}

export default Calendar;
