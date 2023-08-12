import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAkvmQX66oTxcf9UYYCB488vXfxQ7fwtQ4",
    authDomain: "linkedin-clone-ad6af.firebaseapp.com",
    projectId: "linkedin-clone-ad6af",
    storageBucket: "linkedin-clone-ad6af.appspot.com",
    messagingSenderId: "240007467045",
    appId: "1:240007467045:web:9893b57fdef57c7bd4efcc"
  };

    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);
    const auth = getAuth(firebaseApp);


    // const myCollectionRef = collection(db, 'posts');

    export {db, auth}
    export default db;