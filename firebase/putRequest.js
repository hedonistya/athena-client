import {addDoc, collection} from "firebase/firestore";
import {ref, uploadString} from "firebase/storage";

// components
import {boardState} from "../store";
import {firebase, storage} from "./config";

/**
 * Add data in firebase
 * @param code
 * @param username
 * @param ownerName
 * @param title
 */
const addData = async (code, username, ownerName, title) => {
  await addDoc(collection(firebase, 'projects'), {
    title: title,
    code: code,
    ownerName: ownerName,
    username: username,
  });

  const uploadImage = ref(storage, `/${window.location.pathname.replace('/', '')}.jpeg`);
  const data = boardState.board.toDataURL().replace(`data:image/png;base64,`, '');
  uploadString(uploadImage, data, 'base64').then(() => {
    console.log('completed');
  })

  alert("Проект сохранен");
}

export default addData;