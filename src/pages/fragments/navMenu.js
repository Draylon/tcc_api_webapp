import {NavLink} from 'react-router-dom';

import UserAlerts from '../../components/userAlerts';
import UserLoginButton from '../../components/userLoginButton';

import CurrentStatus from '../../components/currentStatus';

import NewSearchBar from '../../components/newSearchBar';

const NavMenu = ()=>{
    return(<div className='navmenu'>
    <NavLink to="/">
        <div className='navmenu_icon'></div>
    </NavLink>
    <div className='navmenu_diag'>
        <div className='navmenu_item'>
            <NavLink to="/map">
            <CurrentStatus></CurrentStatus>
            </NavLink>
        </div>
        <div className='navmenu_item'>
            <NewSearchBar></NewSearchBar>
        </div>
        <div className='navmenu_item'>
            <NavLink to="/notification_center">
                <UserAlerts></UserAlerts>
            </NavLink>
        </div>
        <div className='navmenu_item'>
            <UserLoginButton></UserLoginButton>
        </div>
    </div>
</div>)
};

export default NavMenu;