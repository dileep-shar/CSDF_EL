// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAm6r2zte5HunGm3tqJugmvHZAxbQDHsR0",
    authDomain: "aael-4237b.firebaseapp.com",
    projectId: "aael-4237b",
    storageBucket: "aael-4237b.appspot.com",
    messagingSenderId: "57841982786",
    appId: "1:57841982786:web:3e3af624bec1fbd703fcdb",
    measurementId: "G-RFFVND4SKE"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    if (res) {
      const q = query(collection(db, "users"), where("email", "==", user.email));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          email: user.email,
          userType: "user",
        });
      }
    }
    // window.location.reload();
  } catch (err) {
    console.error(err);
    // alert(err.message);
  }
};
export const logout = () => {
  signOut(auth);
};
// export const logInWithEmailAndPassword = async (email, password) => {
//   try {
//     let res=await signInWithEmailAndPassword(auth, email, password);
//   } catch (err) {
//     // console.error(err);
//     throw err
//   }
// };
// export const registerWithEmailAndPassword = async (email, password,userType) => {
//   try {
//     const res = await createUserWithEmailAndPassword(auth, email, password);
//     const user=res.user
//     if(res){
//       const q = query(collection(db, "users"), where("uid", "==", user.uid));
//       const docs = await getDocs(q);
//       if (docs.docs.length === 0) {
//         await addDoc(collection(db, "users"), {
//           uid: user.uid,
//           email: user.email,
//           userType:userType
//         });
//       }
//     }
//   } catch (err) {
//     console.error(err);
//     // alert(err.message);
//   }
// };

export const fetchUserType=async(email)=>{
  try{
  const q = query(collection(db, "users"), where("email", "==", email));
  const docs = await getDocs(q);
  console.log(docs.docs[0]._document.data.value.mapValue.fields.userType.stringValue)
  return docs.docs[0]._document.data.value.mapValue.fields.userType.stringValue
  }
  catch(err){
    return ""
    console.log(err)
  }
}
export default app;
