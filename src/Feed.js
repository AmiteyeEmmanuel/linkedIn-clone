import React, { useEffect, useState } from 'react';
import "./Feed.css";
import { useDispatch, useSelector } from 'react-redux';
import InputOptions from './InputOptions';
import ImageIcon from '@mui/icons-material/Image';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import Post from './Post';
import PostModel from './PostModel';
import { selectUser } from './features/userSlice';
import { selectLoading } from './features/articleReducer';
import { Avatar } from '@mui/material';
import FlipMove from 'react-flip-move';
import { getArticleAPI } from './app/actions';
import { selectArticle } from './features/articleReducer';

function Feed()  {
   const [showModal, setShowModal] = useState("close");


   const handleClick = (e) => {
      e.preventDefault();

      if (e.target !== e.currentTarget) {
        return
      }

        switch (showModal) {
          case "open":
            setShowModal("close");
            break;
          case "close":
            setShowModal("open");
            break;
          default:
            setShowModal("close");
            break;
        }
   }

   const user = useSelector(selectUser);
   const loading = useSelector(selectLoading);
   const posts = useSelector(selectArticle);
   const dispatch = useDispatch();
  

   useEffect(() => {
    dispatch(getArticleAPI()); // Dispatch the action directly
 }, [dispatch]);

 console.log(posts);

  return (
     <>
          <div className='feed'>
          <div className='feed__inputContainer'> 
             <div className='feed__input'> 
                {user && user.photoUrl ? (
                  <Avatar src={user.photoUrl} className='photo'/>
                ) : (
                   <img src='/images/user-icon.svg' className='photo1' alt='user'/>
                )}
                <form>
                  {/* <input value={input}  disabled={loading ? true : false}  onChange={e => setInput(e.target.value)} type='text' placeholder=' Start a post'/> */}
                  <input disabled={loading ? true : false} onClick={handleClick} type='text' placeholder=' Start a post'/>
                   {/* <button  type='submit'> Send</button> */}
                </form>
             </div>
  
             <div className='feed__inputOptions'>
              <InputOptions Icon={ImageIcon} title="Photo" color="#4682A9"/>
              <InputOptions Icon={SmartDisplayIcon} title="Video" color="#609966"/>
              <InputOptions Icon={BusinessCenterIcon} title="Job" color="#AA77FF"/>
              <InputOptions Icon={CalendarViewDayIcon} title="Write article" color="#B8621B"/>
             </div>
          </div>
            
            <div className='content'>
               { loading && <img src='/images/loading.svg' alt=''/>}
               <FlipMove>
                  <Post/>
               </FlipMove>
            </div>
          <PostModel showModal={showModal} handleClick={handleClick}/>
      </div>
     </>
  )
}




export default Feed