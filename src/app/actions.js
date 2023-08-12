import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth} from '../firebase';
import { getStorage, ref, getDownloadURL, uploadBytesResumable  } from 'firebase/storage';
import db from '../firebase';
import { SET_LOADING_STATUS, GET_ARTICLES } from './actionType';
import { collection, onSnapshot, addDoc, serverTimestamp, orderBy, query } from 'firebase/firestore';

export const setLoading = (status) => ({
    type: SET_LOADING_STATUS,
    status: status,
})

export const getArticles = (payload) => ({
    type: GET_ARTICLES,
    payload: payload,
})

export function signInAPI() {
  const provider = new GoogleAuthProvider();

  return (dispatch) => {
    signInWithPopup(auth, provider)
    .then((payload) => {
      const user = payload.user;
      dispatch(signInWithPopup(user));
    })
    .catch(error => alert(error.message))
};
  }


  export function postArticleApi(payload) {
    const storage = getStorage();

    const postCollection = collection(db, "posts")

  
    return (dispatch) => {
      dispatch(setLoading(true));

      if (payload.image !== '') {
        // const upload = uploadBytes(ref(storage, `images/${payload.image.name}`), payload.image);
        const storageRef = ref(storage, `images/${payload.image.name}`);
        const upload = uploadBytesResumable(storageRef, payload.image);
  
        upload.on("state_changed", (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  
          console.log(`Progress: ${progress}%`);
          if (snapshot.state === 'running') {
            console.log(`Progress: ${progress}%`);
          }
        }, error => console.log(error.code),
          async () => {
            // const downloadUrl = await upload.snapshot.ref.getDownloadURL();
            const downloadUrl = await getDownloadURL(upload.snapshot.ref);
            // Handle the downloadUrl, for example, store it in your database or use it as needed.
            // console.log(downloadUrl);
            addDoc(postCollection, {
              actor: {
                title: payload.user.displayName,
                email: payload.user.email,
                image: payload.user.photoUrl,
                timestamp: serverTimestamp(),
                },
              video:payload.video,
              sharedImg: downloadUrl,
              comments: 0,
              description: payload.description,
            });
            dispatch(setLoading(false));
          }
        );
      } else if (payload.video ) {
                addDoc(postCollection, {
              actor: {
                title: payload.user.displayName,
                email: payload.user.email,
                image: payload.user.photoUrl,
                timestamp: serverTimestamp(),
              },
              video:payload.video,
              sharedImg: '',
              comments: 0,
              description: payload.description,
          });
          dispatch(setLoading(false));
      }
    };
  }
  
  export function getArticleAPI() {
    return (dispatch) => {
      let payload;

      const postCollection = collection(db, 'posts');
      const orderedCollection = query(postCollection, orderBy('actor.timestamp', 'desc'));

      onSnapshot(orderedCollection, (snapshot) => {
        payload = snapshot.docs.map((doc) => doc.data());
        // console.log(payload);
        dispatch(getArticles(payload));
      })
    }
  }
  