import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";

// components
import {firebaseGetAuth} from './config'
import {userState} from "../store";

const provider = new GoogleAuthProvider();

/**
 * Auth with Google provider and add data to firebase
 * @return Set username to local storage
 */
const authWithGoogleProvider = () => {
  signInWithPopup(firebaseGetAuth, provider).then(result => {

    localStorage.setItem("displayNameAthena", result.user.displayName);
    localStorage.setItem("userEmailAthena", result.user.email);
    localStorage.setItem("userAvatarAthena", result.user.photoURL);
    userState.setUsername(localStorage.getItem('displayNameAthena'));

    window.location.reload(false);
  }).catch(error => {
    console.error(error.message);
  });
};

export default authWithGoogleProvider;