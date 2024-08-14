import { useSettingsContext } from '../SettingsContext/SettingsContext';
import { useTheme } from '../ThemeContext/ThemeContext';
import './CalendarGrid.css';

function CalendarGrid({monthIn, yearIn, dayIn, selectedDateIn, handleMonthItemClick, size}) {

    let options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };

    let {theme} = useTheme();

    let {settings} = useSettingsContext();

    let firstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
      };

      let numberOfDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
      };

    let buildCalendarItems = () => {
        let values = [];
        let keyVal = 1;
    
        let weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    
        values.push(
          <div className={`calendar-item week-day-name ${size === 'small' && 'small'}`} key={keyVal++} style={theme === 'dark' ? {border: "1px solid #fff", color: "#fff", WebkitTextStrokeColor: "#fff"} : {border: "1px solid #000", color:"#000", WebkitTextStrokeColor: "#000"}}>
            {weekDays[0]}
          </div>
        );
        values.push(
          <div className={`calendar-item week-day-name ${size === 'small' && 'small'}`} key={keyVal++} style={theme === 'dark' ? {border: "1px solid #fff", color: "#fff", WebkitTextStrokeColor: "#fff"} : {border: "1px solid #000", color:"#000", WebkitTextStrokeColor: "#000"}}>
            {weekDays[1]}
          </div>
        );
        values.push(
          <div className={`calendar-item week-day-name ${size === 'small' && 'small'}`} key={keyVal++} style={theme === 'dark' ? {border: "1px solid #fff", color: "#fff", WebkitTextStrokeColor: "#fff"} : {border: "1px solid #000", color:"#000", WebkitTextStrokeColor: "#000"}}>
            {weekDays[2]}
          </div>
        );
        values.push(
          <div className={`calendar-item week-day-name ${size === 'small' && 'small'}`} key={keyVal++} style={theme === 'dark' ? {border: "1px solid #fff", color: "#fff", WebkitTextStrokeColor: "#fff"} : {border: "1px solid #000", color:"#000", WebkitTextStrokeColor: "#000"}}>
            {weekDays[3]}
          </div>
        );
        values.push(
          <div className={`calendar-item week-day-name ${size === 'small' && 'small'}`} key={keyVal++} style={theme === 'dark' ? {border: "1px solid #fff", color: "#fff", WebkitTextStrokeColor: "#fff"} : {border: "1px solid #000", color:"#000", WebkitTextStrokeColor: "#000"}}>
            {weekDays[4]}
          </div>
        );
        values.push(
          <div className={`calendar-item week-day-name ${size === 'small' && 'small'}`} key={keyVal++} style={theme === 'dark' ? {border: "1px solid #fff", color: "#fff", WebkitTextStrokeColor: "#fff"} : {border: "1px solid #000", color:"#000", WebkitTextStrokeColor: "#000"}}>
            {weekDays[5]}
          </div>
        );
        values.push(
          <div className={`calendar-item week-day-name ${size === 'small' && 'small'}`} key={keyVal++}style={theme === 'dark' ? {border: "1px solid #fff", color: "#fff", WebkitTextStrokeColor: "#fff"} : {border: "1px solid #000", color:"#000", WebkitTextStrokeColor: "#000"}}>
            {weekDays[6]}
          </div>
        );
    
        // returns the day number for the first day of the month
        let firstDayOfTheMonth = firstDayOfMonth(monthIn, yearIn);
    
        let numberOfDaysInPreviousMonth = numberOfDaysInMonth(monthIn, yearIn);
        
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
            
          } else if (i > numberOfDaysInMonth(monthIn + 1, yearIn)){
    
            values.push(<div
                className={`disabled-calendar-item`}
                key={keyVal++}
              >
                {nextMonthDates++}
                </div>);
    
          } else if (new Date(yearIn, monthIn, i+1) < new Date()){
    
            values.push(<div
                className={`disabled-calendar-item`}
                key={keyVal++}
              >
                {nextMonthDates++}
                </div>);
    
          } else if ((settings.weekends === '1' && new Date(yearIn, monthIn, i+1).getDay() === 0) || 
          (settings.weekends === '1' && new Date(yearIn, monthIn, i+1).getDay() === 1) || 
          (settings.weekends === '2' && new Date(yearIn, monthIn, i+1).getDay() === 6) || 
          (settings.weekends === '2' && new Date(yearIn, monthIn, i+1).getDay() === 0) || 
          (settings.weekends === '3' && new Date(yearIn, monthIn, i+1).getDay() === 6) || 
          (settings.weekends === '4' && new Date(yearIn, monthIn, i+1).getDay() === 0) || 
          (settings.weekends === '5' && new Date(yearIn, monthIn, i+1).getDay() === 1)){
    
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
                className={`calendar-item ${selectedDateIn === new Date(yearIn, monthIn, i).toLocaleDateString() ? 'current-calendar-item' : null} ${size == 'small' && 'small'}`}
                key={keyVal++}
                onClick={() => handleMonthItemClick(i)}
                style={theme === 'dark' ? {border: "1px solid #fff", color: "#fff"} : {border: "1px solid #000", color:"#000"}}
              >
                  {new Date().toLocaleDateString("en-US", options) === `${monthIn + 1}/${i}/${yearIn}` ? <><span style={{fontSize: "10px", fontWeight: "500"}}>Today</span><br /></> : null}
                {i}
              </div>
            );
          }
        }
    
        return values;
      };





    return <div
    className={`calendar-grid ${size === 'small' && 'small'}`}
    style={
      theme === "dark"
        ? { border: "1px solid #fff", color: "#fff", backgroundColor: "#000" }
        : { border: "1px solid #000", color: "#000", backgroundColor: "rgba(238, 171, 0, 1)" }
    }
  >
    {buildCalendarItems()}
  </div>
}

export default CalendarGrid;