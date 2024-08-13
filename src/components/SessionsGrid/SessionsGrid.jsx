import { useEffect, useState } from "react";
import { useSettingsContext } from "../SettingsContext/SettingsContext";
import { useTheme } from "../ThemeContext/ThemeContext";
import "./SessionsGrid.css";
import { useAppointmentsContext } from "../AppointmentsContext/AppointmentsContext";

function SessionsGrid({
  selectedDateIn,
  yearIn,
  monthIn,
  dayIn,
  handleJumpToTodayClick,
  handleBookSessionClick,
}) {
  let { theme } = useTheme();
  let { settings } = useSettingsContext();
  let { appointments } = useAppointmentsContext();
  let [sessions, setSessions] = useState([]);

  useEffect(() => {
    setSessions(getAvailableSessions(new Date(yearIn, monthIn, dayIn)));
  }, [yearIn, monthIn, dayIn]);

  let getAvailableSessions = (dateVal) => {
    let val = [];
    let i = 0;

    const lastSession = parseInt(settings.lastSession);

    let startTimeInMinutes =
      parseInt(settings.from.split(":")[0]) * 60 +
      parseInt(settings.from.split(":")[1]);
    let endTimeInMinutes =
      parseInt(settings.to.split(":")[0]) * 60 +
      parseInt(settings.to.split(":")[1]);

    if (settings.duration === "1") {
      if (lastSession === 1) {
        while (startTimeInMinutes <= endTimeInMinutes) {
          let hourVal = `${parseInt(startTimeInMinutes / 60)
            .toString()
            .padStart(2, "0")}:${(startTimeInMinutes % 60)
            .toString()
            .padStart(2, "0")}`;
          let exists = false;
          for (let j = 0; j < appointments.length; j++) {
            if (
              appointments[j].date === dateVal.toLocaleDateString() &&
              appointments[j].session === hourVal
            ) {
              exists = true;
              break;
            }
          }

          if (!exists) {
            val.push(
              <span
                onClick={() => handleBookSessionClick(hourVal, dateVal)}
                key={i++}
                className="session-item"
              >
                {hourVal}
              </span>
            );
          }
          startTimeInMinutes += 60;
        }
      }
    }

    /*else {
            while(startTimeInMinutes < endTimeInMinutes) {
              let hourVal = `${parseInt(startTimeInMinutes/60).toString().padStart(2,'0')}:${(startTimeInMinutes%60).toString().padStart(2,'0')}`;
              //val.push(<span onClick={() => handleBookSessionClick(hourVal, dateVal)} key={i++} className="session-item">{hourVal}</span>);
              for(let i = 0; i < appointments.length; i++){
                if(appointments[i].date === dateVal.toLocaleDateString() && appointments[i].session === hourVal){
                } else {
                  val.push(<span onClick={() => handleBookSessionClick(hourVal, dateVal)} key={i++} className="session-item">{hourVal}</span>);
                }
              }
              startTimeInMinutes += 60;
            }
          }
        }
    
        if(settings.duration === "2"){
          if(lastSession === 1) {
            while(startTimeInMinutes <= endTimeInMinutes) {
              let hourVal = `${parseInt(startTimeInMinutes/60).toString().padStart(2,'0')}:${(startTimeInMinutes%60).toString().padStart(2,'0')}`;
              //val.push(<span onClick={() => handleBookSessionClick(hourVal, dateVal)} key={i++} className="session-item">{hourVal}</span>);
              for(let i = 0; i < appointments.length; i++){
                if(appointments[i].date === dateVal.toLocaleDateString() && appointments[i].session === hourVal){
                } else {
                  val.push(<span onClick={() => handleBookSessionClick(hourVal, dateVal)} key={i++} className="session-item">{hourVal}</span>);
                }
              }
              startTimeInMinutes += 30;
            }
          } else {
            while(startTimeInMinutes < endTimeInMinutes) {
              let hourVal = `${parseInt(startTimeInMinutes/60).toString().padStart(2,'0')}:${(startTimeInMinutes%60).toString().padStart(2,'0')}`;
              //val.push(<span onClick={() => handleBookSessionClick(hourVal, dateVal)} key={i++} className="session-item">{hourVal}</span>);
              for(let i = 0; i < appointments.length; i++){
                if(appointments[i].date === dateVal.toLocaleDateString() && appointments[i].session === hourVal){
                } else {
                  val.push(<span onClick={() => handleBookSessionClick(hourVal, dateVal)} key={i++} className="session-item">{hourVal}</span>);
                }
              }
              startTimeInMinutes += 30;
            }
          }
        }*/

    return val;
  };

  return (
    <div
      className="sessions-grid"
      style={
        theme === "dark"
          ? { border: "1px solid #fff", color: "#fff" }
          : { border: "1px solid #000", color: "#000" }
      }
    >
      <span
        className="selected-date-field selected-date-text-field"
        style={theme === "dark" ? { color: "#fff" } : { color: "#000" }}
      >
        AVAILABLE SESSIONS{" "}
        <span
          style={{
            color: "rgba(238, 171, 0, 1)",
            fontWeight: "600",
            textDecoration: "underline",
          }}
        >{`${selectedDateIn.split("/")[0].padStart(2, "0")}/${selectedDateIn
          .split("/")[1]
          .padStart(2, "0")}/${selectedDateIn.split("/")[2]}`}</span>
        <input
          className="move-to-today-btn"
          onClick={handleJumpToTodayClick}
          type="button"
          value={"Today"}
        />
      </span>
      {sessions}
    </div>
  );
}

export default SessionsGrid;
