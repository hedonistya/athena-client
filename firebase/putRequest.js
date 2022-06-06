import {doc, addDoc, collection} from "firebase/firestore";
import {firebase, storage} from "./config";
import {ref, uploadString} from "firebase/storage";
import boardState from "../store/boardState";

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