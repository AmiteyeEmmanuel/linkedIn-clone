import React from 'react';
import './Widget.css';
import { useSelector } from 'react-redux';
import InfoIcon from '@mui/icons-material/Info';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Avatar } from '@mui/material';
import { selectUser } from './features/userSlice';

function Widget() {
    const user = useSelector(selectUser);

    const newsArticle = (name, headline) => (
        <div className='widgets__article'>
            <div className='article__left'>
            <Avatar src={user.photoUrl}/>
            </div>

            <div className='article__right'>
               <h4>{name}</h4> 
               <p> {headline} </p>
               <button> <p> + Follow </p>  </button>
            </div> 
        </div>
    );
  return (
    <div className='widgets'>
       <div className='widgets__header'>
          <h3> Add to your feed</h3>
          <InfoIcon className='icon'/>
       </div>
        {newsArticle("Jessica Mathew", "Software Engineer | Article writer.")}
        {newsArticle("Micheal Jonathan", "Front-End Developer, TypeScript, Django| Content Creator.")}
        {newsArticle("David Bill", "Human Resource| Blogger | Content-Creator.")}
        {newsArticle("Emmanuel Davidson", "Back-End Developer, Python, Php, React, Redux ||Project-Lead.  .")}

        <div className='widget__post'>
            <div className='widgetpost___body1'>
            <p> View all recommendation </p>
            <ArrowRightAltIcon className='icon'/>
            </div>
            <div className='widgetpost__body2'>
                <p className='widgetpost__ad'>Ad...</p>
                <img className='img' src='https://media.licdn.com/media/AAYQAgTPAAgAAQAAAAAAADVuOvKzTF-3RD6j-qFPqhubBQ.png' alt=''/>
                <p className='widgetpost__one'> Get latest jobs and industry news.</p>
                <Avatar className='avatar' src={user.photoUrl}/> 
                <p> {user.displayName} explore relevant opportunity.</p>
            </div>
        </div>
    </div>
  )
}

export default Widget