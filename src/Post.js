import { Avatar } from '@mui/material'
import React, { useEffect } from 'react'
import "./Post.css";
import { useDispatch, useSelector } from 'react-redux';
import InputOptions from './InputOptions'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatOutlinedIcon  from '@mui/icons-material/ChatOutlined';
import  CachedOutlinedIcon  from '@mui/icons-material/CachedOutlined';
import { selectArticle } from './features/articleReducer';
import { getArticleAPI} from './app/actions';
import ReactPlayer from 'react-player';

  function Post()  {
  const posts = useSelector(selectArticle);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticleAPI()); // Dispatch the action directly
 }, [dispatch]);


 
  return (
    <>
       {posts.length > 0 && 
       posts.map ((post, index)=> (
           <div className='post' key={index}>
           <div className='post__header'>
               <Avatar src={post.actor.image}> </Avatar>
               <div className='post__info'>
                   <h2>{post.actor.title}</h2>
                   <h2>{post.actor.email}</h2>
               </div>
           </div>
           <div className='post__body'>
                <p className='desc'>{post.description}</p>
                      {
                        !post.sharedImg && post.video ? <ReactPlayer width={'100%'} url={post.video}/>
                        : (
                            post.sharedImg && <img src={post.sharedImg} alt='img'/> 
                        )
                      }
           </div>
   
           {/* <div className='post__buttons'> 
             <button> <InputOptions Icon={ThumbUpAltOutlinedIcon} color="gray"/> </button>
             <button> <InputOptions Icon={ChatOutlinedIcon} color="gray"/> </button>
             <button> <InputOptions Icon={CachedOutlinedIcon} color="gray"/> </button>
           </div> */}
           <div className='post__buttons'>
           <button>
             {' '}
             <InputOptions Icon={ThumbUpAltOutlinedIcon} color='gray' />{' '}
           </button>
           <button>
             {' '}
             <InputOptions Icon={ChatOutlinedIcon} color='gray' />{' '}
           </button>
           <button>
             {' '}
             <InputOptions Icon={CachedOutlinedIcon} color='gray' />{' '}
           </button>
         </div>
       </div>
       ))}
    </>
  )
}


export default Post;
