import { useState } from 'react'
import './AgendaItemCreator.css'
import { useTasksContext } from '../TasksContext/TasksContext'

function AgendaItemCreator(props) {
    let [taskDesc, setTaskDesc] = useState('');

    let {tasks, setTasks} = useTasksContext();

    let handleModalContainerClick = (event) => {
        if(event.target.id === 'modalContainer'){
            props.hideModal()
        }
    }

    let handleChange = (event) => {
        setTaskDesc(event.target.value);
    }

    let handleButtonClick = () => {
        if(taskDesc != ''){
            setTasks([...tasks, taskDesc]);
            props.hideModal()
        }
    }

    return props.showModal ? 
        <div className='modal-container' onClick={handleModalContainerClick} id="modalContainer">
            <div className="modal-box" id="modalBox">
                <input className='agenda-item-control' type='text' value={props.dateValue} disabled={props.disabled} />
                <textarea className='agenda-item-control' onChange={handleChange} />
                <input className='agenda-item-control' type='button' onClick={handleButtonClick} value='SAVE' />
            </div>
        </div>
        : null
    
}

export default AgendaItemCreator;