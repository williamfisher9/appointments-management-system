import { useEffect, useState } from "react";
import "./Month.css";
import AgendaItemCreator from "../AgendaItemCreator/AgendaItemCreator";
import MonthSelector from "../MonthSelector/MonthSelector";

function Month() {
    

    let date = new Date();
    let options = {
        //weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }
    //console.log(date)
    //console.log(date.toLocaleDateString('en-US', options))
    //console.log(`new date ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`)

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let [day, setDay] = useState(0);
    let [month, setMonth] = useState(0);
    let [year, setYear] = useState(date.getFullYear());
    let [showModal, setShowModal] = useState(false);
    
    let [showMonthSelector, setShowMonthSelector] = useState(false);

    useEffect(() => {
        setMonth(date.getMonth())
    }, []);

    let handleMonthItemClick = (val) => {
        setShowModal(true);
        setDay(val);
    }

    let hideModal = () => {
        setShowModal(false);
    }

    let hideMonthSelector = () => {
        setShowMonthSelector(false);
    }

    let buildCalendarItems = () => {
        let values = [];
        let keyVal = 1;

        values.push(<div className="calendar-item week-day-name" key={keyVal++}>Sun</div>)
        values.push(<div className="calendar-item week-day-name" key={keyVal++}>Mon</div>)
        values.push(<div className="calendar-item week-day-name" key={keyVal++}>Sun</div>)
        values.push(<div className="calendar-item week-day-name" key={keyVal++}>Sun</div>)
        values.push(<div className="calendar-item week-day-name" key={keyVal++}>Sun</div>)
        values.push(<div className="calendar-item week-day-name" key={keyVal++}>Sun</div>)
        values.push(<div className="calendar-item week-day-name" key={keyVal++}>Sun</div>)

        
        for(let i = 1; i <= daysInMonth(month+1, date.getFullYear()); i++){
            values.push(<div className={`calendar-item ${date.toLocaleDateString('en-US', options) === `${month+1}/${i}/${year}` ? 'current-calendar-item' : null}`} key={keyVal++} onClick={() => handleMonthItemClick(i)}>{i}</div>);
        }


        return values;
    }


    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }


    let handlePlus = () => {
        if(month == 11){
            setMonth(0);
            setYear(++year)
        } else {
        setMonth(++month);
    }
    }

    let handleMinus = () => {
        if(month == 0){
            setMonth(11);
            setYear(--year)
        }else {
        setMonth(--month);}
    }

    let handleYearTextChange = (event) => {
        setYear(event.target.value);
        console.log(event.target.value)
    }

    let handleShowMonthSelector = () => {
        setShowMonthSelector(true);
    }

    let setMonthValue = (val) => {
        setMonth(val);
        setShowMonthSelector(false);
    }

    let handlePlusYearIcon = () => {
        setYear(++year);
    }

    let handleMinusYearIcon = () => {
        setYear(--year);
    }

  return (
    <div className="month-container">

        <div className="text-field-container">
            <input className="text-field" type="text" value={year} onChange={handleYearTextChange}/>
            <div className="plus-icon" onClick={handlePlusYearIcon}><i className="fa-solid fa-chevron-up"></i></div>
            <div className="minus-icon" onClick={handleMinusYearIcon}><i className="fa-solid fa-chevron-down"></i></div>
        </div>

        <div className="month-control">
            <div className="month-control-item" onClick={handleMinus}><i className="fa-solid fa-chevron-left"></i></div>
            <div className="month-control-item" onClick={handleShowMonthSelector}>{months[month]}</div>
            <div className="month-control-item" onClick={handlePlus}><i className="fa-solid fa-chevron-right"></i></div>
        </div>
      <div className="calendar-grid">
        {buildCalendarItems()}
      </div>
      {showModal ? <AgendaItemCreator showModal={showModal} hideModal={hideModal} dateValue={`${month+1}/${day}/${year}`} disabled={true}/> : null}

      {showMonthSelector ? <MonthSelector showMonthSelector={showMonthSelector} hideMonthSelector={hideMonthSelector} setMonthValue={setMonthValue}/> : null}
    </div>
  );
}

export default Month;
