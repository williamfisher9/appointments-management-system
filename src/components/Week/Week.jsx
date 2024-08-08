import { useEffect } from "react";
import "./Week.css";
import { useState } from "react";


let buildWeekCalendar = (firstDate, lastDate) => {
  let getNewUUID = () => {
    return crypto.randomUUID();
  };

  

  let weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  let getDaysDate = (val) => {
    let newDate = new Date(firstDate);
    newDate.setDate(newDate.getDate() + val);
    return newDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
  }


  let val = [];

  val.push(
    <div className="week-grid-item week-grid-day-name" key={getNewUUID()}></div>
  );
  
  val.push(
    <div className="week-grid-item week-grid-day-name" key={getNewUUID()}>
      {`${weekDays[0]}`}
      <br />
      {`${getDaysDate(0)}`}
    </div>
  );
  val.push(
    <div className="week-grid-item week-grid-day-name" key={getNewUUID()}>
     {`${weekDays[1]}`}
      <br />
      {`${getDaysDate(1)}`}
    </div>
  );
  val.push(
    <div className="week-grid-item week-grid-day-name" key={getNewUUID()}>
      {`${weekDays[2]}`}
      <br />
      {`${getDaysDate(2)}`}
    </div>
  );
  val.push(
    <div className="week-grid-item week-grid-day-name" key={getNewUUID()}>
      {`${weekDays[3]}`}
      <br />
      {`${getDaysDate(3)}`}
    </div>
  );
  val.push(
    <div className="week-grid-item week-grid-day-name" key={getNewUUID()}>
      {`${weekDays[4]}`}
      <br />
      {`${getDaysDate(4)}`}
    </div>
  );
  val.push(
    <div className="week-grid-item week-grid-day-name" key={getNewUUID()}>
      {`${weekDays[5]}`}
      <br />
      {`${getDaysDate(5)}`}
    </div>
  );
  val.push(
    <div className="week-grid-item week-grid-day-name" key={getNewUUID()}>
      {`${weekDays[6]}`}
      <br />
      {`${getDaysDate(6)}`}
    </div>
  );

  for (let i = 0; i <= 23; i++) {
    for (let j = 0; j < 4; j++) {
      val.push(
        <div className="week-grid-item week-grid-hour" key={getNewUUID()}>
          {i.toString().padStart(2, "0")}:{(j * 15).toString().padStart(2, "0")}
        </div>
      );
      val.push(<div className="week-grid-item" key={getNewUUID()}></div>);
      val.push(<div className="week-grid-item" key={getNewUUID()}></div>);
      val.push(<div className="week-grid-item" key={getNewUUID()}></div>);
      val.push(<div className="week-grid-item" key={getNewUUID()}></div>);
      val.push(<div className="week-grid-item" key={getNewUUID()}></div>);
      val.push(<div className="week-grid-item" key={getNewUUID()}></div>);
      val.push(<div className="week-grid-item" key={getNewUUID()}></div>);
    }
  }

  return val;
};

function Week() {

    let options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }
  const [firstDate, setFirstDate] = useState(new Date().toLocaleDateString('en-US', options));
  const [lastDate, setLastDate] = useState(new Date().toLocaleDateString('en-US', options));

  useEffect(() => {
    let newFirstDate = new Date();
    newFirstDate.setDate(
      new Date(firstDate).getDate() - new Date(firstDate).getDay()
    );

    let newLastDate = new Date();
    newLastDate.setDate(
      new Date(lastDate).getDate() + (6 - new Date(lastDate).getDay())
    );

    setFirstDate(newFirstDate.toLocaleDateString('en-US', options));
    setLastDate(newLastDate.toLocaleDateString('en-US', options));

  }, []);

  let handlePreviousWeek = () => {
    let newFirstDate = new Date(firstDate);
    newFirstDate.setDate(newFirstDate.getDate() - 7);

    let newLastDate = new Date(lastDate);
    newLastDate.setDate(newLastDate.getDate() - 7);

    setFirstDate(newFirstDate.toLocaleDateString('en-US', options));
    setLastDate(newLastDate.toLocaleDateString('en-US', options));
  }

  let handleNextWeek = () => {
    let newFirstDate = new Date(lastDate);
    newFirstDate.setDate(newFirstDate.getDate() + 1);

    let newLastDate = new Date(lastDate);
    newLastDate.setDate(newLastDate.getDate() + 7);

    setFirstDate(newFirstDate.toLocaleDateString('en-US', options));
    setLastDate(newLastDate.toLocaleDateString('en-US', options));
  }

  return (
    <div className="week-container">
      <div className="week-control">
        <div className="week-control-item week-control-button add-week-control-button">
          <i className="fa-solid fa-chevron-left" onClick={handlePreviousWeek}></i>
        </div>
        <div className="week-control-item">
          {firstDate} to {lastDate}
        </div>
        <div className="week-control-item week-control-button subtract-week-control-button">
          <i className="fa-solid fa-chevron-right" onClick={handleNextWeek}></i>
        </div>
      </div>
      <div className="week-grid">{buildWeekCalendar(firstDate, lastDate)}</div>
    </div>
  );
}

export default Week;
