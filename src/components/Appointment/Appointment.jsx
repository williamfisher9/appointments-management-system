import { useAppointmentsContext } from "../AppointmentsContext/AppointmentsContext";
import { useTheme } from "../ThemeContext/ThemeContext";
import './Appointment.css'

function Appintment(){
    let { appointments, setAppointments } = useAppointmentsContext();
    let {theme} = useTheme();
    
    let handleDeleteAppointment = (itemId) => {
      let newAppointments = [];

      for(let i = 0; i < appointments.length; i++){
        if(appointments[i].uuid !== itemId){
          console.log('not found')
          newAppointments.push(appointments[i]);
        } 
      }

      setAppointments([...newAppointments]);

    }

    return <div className="appointments-container">
          <table className="appointments-grid">
          <thead>
            <tr>
            <td>ID</td><td>DATE</td><td>TIME</td><td>NAME</td><td>PHONE</td><td>DETAILS</td><td>ACTIONS</td>
            </tr>
          </thead>
          <tbody>
          {
              appointments.map((element) => {
                return <tr key={element.uuid} className={theme === 'dark' ? 'dark-theme-font' : 'light-theme-font'}>
                <td>{element.uuid}</td>
                <td>{element.date}</td>
                <td>{element.session}</td>
                <td>{element.name}</td>
                <td>{element.phone}</td>
                <td>{element.description}</td>
                <td><i class="action-icon fa-solid fa-trash" onClick={() => handleDeleteAppointment(element.uuid)}></i></td>
                </tr>
              })
            }
          </tbody>
          </table>

          <div className="appointments-cards">
            {
              appointments.map((element) => {
                return <div key={element.uuid} className={theme === 'dark' ? 'card dark-theme-font' : 'card light-theme-font'}>
                    <h2>{element.name}</h2>
                    <p>{element.date}</p>
                    <p>{element.session}</p>
                    <p>{element.phone}</p>
                    <p>{element.description}</p>
                  </div>
              })
            }
          </div>
    </div>
}

export default Appintment;