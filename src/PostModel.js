import React,{ useState } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import './postModel.css';
import ReactPlayer from 'react-player';
import { selectUser } from './features/userSlice';
import { postArticleApi } from './app/actions';
import { serverTimestamp } from 'firebase/firestore';



const PostModel = (props) => {
  const [editortext, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoPlay, setVideoPlay]  = useState("");
  const [assetArea, setAssetArea] = useState("");


  const user = useSelector(selectUser);

  const dispatch = useDispatch();


  const handleChange = (e) => {
    const image = e.target.files[0];

    if(image === "" || image===undefined) {
      alert(`image undefined, this image file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };

  const switchAsssetArea = (area) => {
    setShareImage("");
    setVideoPlay("");
    setAssetArea(area);
  };

  const postArticle = (e) => {
    e.preventDefault(); 
    if(e.target !== e.currentTarget) {
      console.log("hello")
      return;
    }

    const payload = {
      image: shareImage,
      video: videoPlay,
      user: user,
      description: editortext,
      timestamp: serverTimestamp(),
    };

    dispatch(postArticleApi(payload));
    reset(e);
  }

  const reset = (e) => {
      setEditorText("")
      setShareImage("")
      setVideoPlay("")
      props.handleClick(e);
  };



  return (
    <>
        {  props.showModal === "open" && 
              <div className='Container'>
              <div className='Content'> 
                   <div className='header'>
                     <h2> Create a Post</h2>
                     <button onClick={(event) => reset(event)}>
                         <img src='/images/close-icon.svg' alt='close-icon'/>
                     </button>
                   </div>
                   <div className='sharedContent'>
                      <div className='userInfo'>
                        {user.photoUrl ? <img src={user.photoUrl}/>
                        : (
                          <img src='/images/user-icon.svg' alt='user-icon'/>
                        )}
                          <span>{user.displayName}</span> 
                      </div>
                      <div className='editor'>
                      <textarea 
                        value={editortext} 
                        onChange={(e) => setEditorText(e.target.value)}
                        placeholder='what do want to talk about?'
                        autoFocus={true}
                        />
                        { assetArea === 'image' ? (
                        <div className='uploadImage'>
                          <input type='file' 
                          accept='image/gif, image/png, image/jpeg'
                          name='image'
                          id='file'
                          style={{display: "none" }}
                          onChange={handleChange}/> 
                          <p style={{cursor: "pointer", color:"gray"}}> <label htmlFor='file'> Add a photo</label></p>
                          {shareImage && <img src={URL.createObjectURL(shareImage)}/>}
                          </div>
                          )  : (
                          assetArea === 'media' && (
                          <>
                          <input style={{width:"100%", height:"10%"}} type='text' placeholder='Add a video'
                          value={videoPlay}
                          onChange={(e) => setVideoPlay(e.target.value)}
                          />
                          {videoPlay && ( <ReactPlayer width={'100%'} url={videoPlay}/>
                          )}
                          </>
                          )
                        )}
                      </div>
                   </div>
                   <div className='sharedCreation'>
                       <div className='attachAsset'>
                            <button onClick={() => switchAsssetArea('image')} className='assetButton'>
                            <img src='/images/Image-Icons.svg' alt='image-share' />
                            </button>
                            <button onClick={() => switchAsssetArea('media')} className='assetButton'>
                            <img src='/images/video-camera.svg' alt='video-share' />
                            </button>
                       </div>
                       <div className='sharedComment'>
                            <button className='assetbutton'>
                                <img src="/images/comment.svg" alt=''/>
                                <p>Anyone</p>
                            </button>
                       </div>
      
                       <button disabled={!editortext ? true : false} className="postbutton" onClick={(event) => postArticle(event)}> 
                            Post     
                       </button>
                   </div>
              </div>
          </div>
        }
    </>
  )
}

export default PostModel;