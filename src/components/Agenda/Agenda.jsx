import { useTasksContext } from "../TasksContext/TasksContext";

function Agenda(){
    let { tasks } = useTasksContext();
    
    let i = 0;

    const listItems = tasks.map((number) =>
        <li key={++i}>{number}</li>
      );

    return <ul>{listItems}</ul>;
}

export default Agenda;