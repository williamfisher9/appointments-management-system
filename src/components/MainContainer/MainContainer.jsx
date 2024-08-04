import { Outlet } from 'react-router-dom';
import './MainContainer.css';

function MainContainer(){
    return <div className="main-container">
        <Outlet />
    </div>
}

export default MainContainer;