import React, { useState } from 'react';
import "./Header.css";
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HeaderOption from './headerOption';
import { logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import DialpadIcon from '@mui/icons-material/Dialpad';

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
  }
  return (
    <div className='header'>
      <div className='header__left'> 

      <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" alt=''/>

      <div className='header__search'>
        <div>
        <input type='text' placeholder='Search'/>
        </div>
            <SearchIcon className='searchIcon'/>
      </div>   
      </div>
    

      <div className='header__right'>
          <ul className='navwrap'>
            <li className='navlist'>
            <a href="/Header"> <HeaderOption Icon={HomeIcon} title = "Home"/> </a>
            </li>
            <li className='navlist'>
            <a href="/"> <HeaderOption Icon={SupervisorAccountIcon} title ="My Network"/> </a>
            </li>
            <li className='navlist'>
            <a href="/"> <HeaderOption Icon={BusinessCenterIcon} title ="Jobs"/></a>
            </li>
            <li className='navlist'>
            <a href='/'> <HeaderOption Icon={ChatIcon} title ="Messaging"/></a>
            </li>
            <li className='navlist'>
            <a href="/"> <HeaderOption Icon={NotificationsIcon} title ="Notifications"/></a>
            </li>
            <li className='navlist1'>
            <a onClick={handleToggleMenu}>  <HeaderOption avatar={user.photoUrl} title1 = 'Me'/>
              <ArrowDropDownIcon className='icons'/>
               {isOpen && (
            <div className='signOut'> 
                <p onClick={logoutOfApp}> logout</p>
            </div>
              )}
            </a>  
            </li>
            <li className='navlist2'>
               <a>
               <HeaderOption Icon={DialpadIcon} title ="Business"/>
                <ArrowDropDownIcon  className='icons1' />
               </a>
            </li>
            <li className='navlist2'>
              <a>
              <HeaderOption Icon={SlideshowIcon} title ="Learning"/>
              </a>
            </li>
          </ul>
      </div>

    </div>
  )
}

export default Header