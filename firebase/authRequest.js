import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";

// components
import {firebaseGetAuth} from './index.config'
import userState from "../store/userState";

const provider = new GoogleAuthProvider();

// todo: auth with Google provider
/**
 * Auth with Google provider and add data to firebase
 * @return Set username to local storage
 */
const authWithGoogleProvider = () => {
  signInWithPopup(firebaseGetAuth, provider).then(result => {
    const credential = GoogleAuthProvider.credentialFromResult(result);

    localStorage.setItem("displayNameAthena", result.user.displayName);
    localStorage.setItem("userEmailAthena", result.user.email);
    localStorage.setItem("userAvatarAthena", result.user.photoURL);

    window.location.reload(false);
  }).catch(error => {
    console.error(error.message);
  });
};

export default authWithGoogleProvider;