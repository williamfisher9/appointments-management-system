import { useRef, useState } from "react";
import "./AppointmentCreator.css";
import { useAppointmentsContext } from "../AppointmentsContext/AppointmentsContext";
import { useTheme } from "../ThemeContext/ThemeContext";
import useOnClickOutside from "../CustomHooks/CustomHooks";

function AppointmentCreator(props) {
  let [appointment, setAppointment] = useState({});

  let [showError, setShowError] = useState(false);

  let { appointments, setAppointments } = useAppointmentsContext();

  let { theme } = useTheme();

  let modalRef = useRef();

  useOnClickOutside(modalRef, props.hideModal)

  let checkIfAppointmentExists = (date, session) => {
    for (let i = 0; i < appointments.length; i++) {
      if (
        appointments[i].date === appointment.date &&
        appointments[i].session === appointment.session
      ) {
        return true;
      }
    }

    return false;
  };

  let handleChange = (event) => {
    setAppointment({
      ...appointment,
      [event.target.name]: event.target.value,
      date: props.dateValue,
      session: props.hourValue,
      uuid: crypto.randomUUID(),
    });
  };

  let handleButtonClick = () => {
    if (checkIfAppointmentExists(appointment.date, appointment.session)) {
      setShowError(true);
    } else {
      setAppointments([...appointments, appointment]);
      props.hideModal();
    }
  };

  let handleCancelButton = () => {
    props.hideModal();
  };

  return props.showModal ? (
    <div
      className="modal-container"
    >
      <div
        className="modal-box"
        ref={modalRef}
        style={
          theme === "dark"
            ? {
                backgroundColor: "rgba(0, 0, 0, 1)",
                boxShadow: "4px 4px 15px #000, -4px -4px 15px #000",
              }
            : {
                backgroundColor: "rgba(238, 171, 0, 1)",
                boxShadow: "4px 4px 15px #000, -4px -4px 15px #000",
              }
        }
      >
        <input
          className="agenda-item-control"
          type="text"
          value={props.dateValue}
          disabled={props.disabled}
        />

        <input
          className="agenda-item-control"
          type="text"
          onChange={handleChange}
          placeholder="Full Name"
          name="name"
        />
        <input
          className="agenda-item-control"
          type="text"
          onChange={handleChange}
          placeholder="Phone Number"
          name="phone"
        />

        <textarea
          className="agenda-item-control"
          onChange={handleChange}
          placeholder="Description..."
          name="description"
        />

        <div className="buttons">
          <input
            className="agenda-item-control"
            type="button"
            onClick={handleButtonClick}
            value="SAVE"
            style={
              theme === "dark"
                ? { backgroundColor: "rgba(238, 171, 0, 1)" }
                : { backgroundColor: "rgba(0, 0, 0, 1)" }
            }
          />

          <input
            className="agenda-item-control"
            type="button"
            onClick={handleCancelButton}
            value="CANCEL"
            style={
              theme === "dark"
                ? { backgroundColor: "rgba(238, 171, 0, 1)" }
                : { backgroundColor: "rgba(0, 0, 0, 1)" }
            }
          />
        </div>

        {showError && (
          <p style={{ color: "red" }}>
            Session Reserved! Choose another time slot.
          </p>
        )}
      </div>
    </div>
  ) : null;
}

export default AppointmentCreator;
