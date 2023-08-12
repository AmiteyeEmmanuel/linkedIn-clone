import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import React from 'react';
import "./Sidebar.css";
import { selectUser } from './features/userSlice';

function Sidebar() {
    const user = useSelector(selectUser);

    const recentItem = (topic) => (
        <div className='sidebar__recentItem'>
            <span className='sidebar__hash'>#</span>
            <p> {topic}</p>
        </div>
    );

  return (
       <div className='sidebar'>
       <div className=' sidebar__top'>
          <div className='photo__container'>
            <input type='file' 
                          accept='image/gif, image/png, image/jpeg'
                          name='image'
                          id='file'
                          style={{display: "none" }}/>  
            {/* <img src='https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/> */}
          </div>
         {user && user.photoUrl ? (
                <Avatar src={user.photoUrl} className='sidebar__avatar'/>
              ) : (
                 <img src='/images/user-icon.svg' className='sidebar__avatar1' alt='user'/>
              )}
          <h2> {user.displayName} </h2>
          <h4> {user.email}</h4>
       </div>

        <div className='sidebar__stats'>
            <div className='sidebar__stat'>
                <p> who viewed you</p>
                <p className='sidebar__statNumber'> 2542 </p>
            </div>

            <div className='sidebar__stat'>
                <p> view on post</p>
                <p className='sidebar__statNumber'> 2456 </p>    
            </div>
        </div>

        <div className='sidebar__bottom'>
            <p> Recent</p>
            {recentItem('linkedin-clone')}
            {recentItem('programming')}
            {recentItem('software developer')}
            {recentItem('InterSwitch')}
            {recentItem('flutter')}

        </div>
    </div>
  )
}

export default Sidebar