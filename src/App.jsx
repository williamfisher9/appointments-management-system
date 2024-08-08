import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Agenda from "./components/Agenda/Agenda";
import Layout from "./components/Layout/Layout";
//import Menu from './components/Menu/Menu';
import Month from "./components/Month/Month";
import Settings from "./components/Settings/Settings";
import Week from "./components/Week/Week";
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
              <Route index element={<Month />} />
              <Route path="month" element={<Month />} />
              <Route path="week" element={<Week />} />
              <Route path="agenda" element={<Agenda />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
