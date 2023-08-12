import React, { useState } from 'react'
import "./HeaderOption.css";
import { Avatar } from '@mui/material';

function HeaderOption( {avatar, Icon, title, title1, onClick }) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };
 
  return (
    <div onClick={onClick} className='headerOption'>
        {Icon && <Icon className ="headerOptions__icon"></Icon>}
        {avatar && (
            <Avatar className ="headerOptions__icon" src ={avatar}/> 
            )}
        <h3 className={`headerOption__title ${isActive ?  'active' : ''}`}
          onClick={handleClick}
        > {title} </h3>
        <h3 className='headerOption__title1'> {title1} </h3>
    </div>
  )
}

export default HeaderOption