import { useAppointmentsContext } from "../AppointmentsContext/AppointmentsContext";
import './Agenda.css'

function Agenda(){
    let { appointments } = useAppointmentsContext();
    
    let i = 0;

    return <div className="appointments-container">
      <table className="appointments-grid">
      <thead>
        <tr>
        <td>ID</td><td>DATE</td><td>TIME</td><td>NAME</td><td>PHONE</td><td>DETAILS</td>
        </tr>
      </thead>
      <tbody>
      {
          appointments.map((element) => {
            i++;
            return <tr key={i}>
            <td className="appointments-grid-item">{i}</td>
            <td className="appointments-grid-item">{element.date}</td>
            <td className="appointments-grid-item">{element.session}</td>
            <td className="appointments-grid-item">{element.name}</td>
            <td className="appointments-grid-item">{element.phone}</td>
            <td className="appointments-grid-item">{element.description}</td>
            </tr>
          })
        }
      </tbody>
      </table>
    </div>
}

export default Agenda;