import { useSettingsContext } from '../SettingsContext/SettingsContext';
import './Settings.css';

function Settings(){
    let {settings, setSettings} = useSettingsContext();
    console.log(settings)



    let handleWeekendsChange = (val) => {
        setSettings({...settings, weekends: val})
    }

    let handleDurationChange = (val) => {
        setSettings({...settings, duration: val})
    }

    let handleFromFieldChange = (event) => {
        setSettings({...settings, from: event.target.value})
    }

    let handleToFieldChange = (event) => {
        setSettings({...settings, to: event.target.value})
    }

    return <div className="settings-container">
        
        <div className='page-header'>
            <i className='page-header-icon fa-solid fa-gear fa-spin-pulse'></i>
            <span className='page-header-desc'>Settings</span>
        </div>

        <div className="settings">
            <fieldset className='fieldsets'>
                <legend>Appointment Duration</legend>

                <div className='fieldset-item'>
                    <input type="radio" id="hourly" name="duration" value="1" checked={settings.duration === "1" ? true : false} onChange={() => handleDurationChange('1')}/>
                    <label htmlFor="hourly">60 Minutes</label>
                </div>

                <div className='fieldset-item'>
                    <input type="radio" id="half" name="duration" value="2" checked={settings.duration === "2" ? true : false} onChange={() => handleDurationChange('2')}/>
                    <label htmlFor="half">30 Minutes</label>
                </div>

                <div className='fieldset-item'>
                    <input type="radio" id="quarterly" name="duration" value="3" checked={settings.duration === "3" ? true : false} onChange={() => handleDurationChange('3')}/>
                    <label htmlFor="quarterly">15 Minutes</label>
                </div>
            </fieldset>

            <fieldset className='fieldsets'>
                <legend>Work Hours</legend>

                <div className='fieldset-item'>
                    <label className="fieldset-item-label" htmlFor="from">From</label>
                    <input className="fieldset-item-input" type="text" id="from" name="from" value={settings.from} onChange={handleFromFieldChange}/>
                </div>
                
                <div className='fieldset-item'>
                    <label className="fieldset-item-label" htmlFor="to">To</label>
                    <input className="fieldset-item-input" type="text" id="to" name="to" value={settings.to}  onChange={handleToFieldChange}/>
                </div>
            </fieldset>

            <fieldset className='fieldsets'>
                <legend>Weekend Days</legend>

                <div className='fieldset-item'>
                    <input type="radio" id="option1" name="weekends" value="1" checked={settings.weekends === "1" ? true : false} onChange={() => handleWeekendsChange('1')}/>
                    <label htmlFor="option1">Saturday & Sunday</label>
                </div>

                <div className='fieldset-item'>
                    <input type="radio" id="option2" name="weekends" value="2" checked={settings.weekends === "2" ? true : false} onChange={() => handleWeekendsChange('2')}/>
                    <label htmlFor="option2">Friday & Saturday</label>
                </div>

                <div className='fieldset-item'>
                    <input type="radio" id="option3" name="weekends" value="3" checked={settings.weekends === "3" ? true : false} onChange={() => handleWeekendsChange('3')}/>
                    <label htmlFor="option3">Friday</label>
                </div>

                <div className='fieldset-item'>
                    <input type="radio" id="option4" name="weekends" value="4" checked={settings.weekends === "4" ? true : false} onChange={() => handleWeekendsChange('4')}/>
                    <label htmlFor="option4">Saturday</label>
                </div>

                <div className='fieldset-item'>
                    <input type="radio" id="option5" name="weekends" value="5" checked={settings.weekends === "5" ? true : false} onChange={() => handleWeekendsChange('5')}/>
                    <label htmlFor="option5">Sunday</label>
                </div>

                
            </fieldset>
        </div>
    </div>
}

export default Settings;