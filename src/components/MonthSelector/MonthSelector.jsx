import './MonthSelector.css'

function MonthSelector(props) {

    let handleMonthSelectorContainerClick = (event) => {
        if(event.target.id == 'monthSelectorContainer')
            props.hideMonthSelector();
    }

    let setMonthValue = (val) => {
        props.setMonthValue(val);
    }


    return <div className='month-selector-container' onClick={handleMonthSelectorContainerClick} id='monthSelectorContainer'>
        <div className='month-selector-box'>
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