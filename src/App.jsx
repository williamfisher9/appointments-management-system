import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Appointment from "./components/Appointment/Appointment";
import Layout from "./components/Layout/Layout";
//import Menu from './components/Menu/Menu';
import Calendar from "./components/Calendar/Calendar";
import Settings from "./components/Settings/Settings";
import NoPage from "./components/NoPage/NoPage";
import { useTheme } from "./components/ThemeContext/ThemeContext";
import setBodyColor from './components/Utils/Utils'


function App() {

  const { theme } = useTheme();

  if(theme === 'dark'){
    setBodyColor({color: "#333"})
  } else {
    setBodyColor({color: "#edede9"})
  }
  
  return (
      <div className='app-container '>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Calendar />} />
              <Route path="month" element={<Calendar />} />
              <Route path="appointments" element={<Appointment />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
