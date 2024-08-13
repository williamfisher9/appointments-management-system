import { useRef } from 'react';
import { useTheme } from '../ThemeContext/ThemeContext';
import './MonthSelector.css'
import useOnClickOutside from '../CustomHooks/CustomHooks';

function MonthSelector(props) {

    let {theme} = useTheme();

    const modalRef = useRef(null);

    let setMonthValue = (val) => {
        props.setMonthValue(val);
    }

    useOnClickOutside(modalRef, props.hideMonthSelector)

    return <div className='month-selector-container'  id='monthSelectorContainer'>
        <div  ref={modalRef} className='month-selector-box'  style={theme === 'dark' ? {backgroundColor: "rgba(0, 0, 0, 1)", boxShadow: "4px 4px 15px #000, -4px -4px 15px #000", color: "#FFF"} : {backgroundColor: "rgba(238, 171, 0, 1)", boxShadow: "4px 4px 15px #000, -4px -4px 15px #000"}}>
            <div className='month-name' onClick={() => setMonthValue(0)}>January</div>
            <div className='month-name' onClick={() => setMonthValue(1)}>February</div>
            <div className='month-name' onClick={() => setMonthValue(2)}>March</div>
            <div className='month-name' onClick={() => setMonthValue(3)}>April</div>
            <div className='month-name' onClick={() => setMonthValue(4)}>May</div>
            <div className='month-name' onClick={() => setMonthValue(5)}>June</div>
            <div className='month-name' onClick={() => setMonthValue(6)}>July</div>
            <div className='month-name' onClick={() => setMonthValue(7)}>August</div>
            <div className='month-name' onClick={() => setMonthValue(8)}>September</div>
            <div className='month-name' onClick={() => setMonthValue(9)}>October</div>
            <div className='month-name' onClick={() => setMonthValue(10)}>November</div>
            <div className='month-name' onClick={() => setMonthValue(11)}>December</div>
        </div>
    </div>
}

export default MonthSelector;