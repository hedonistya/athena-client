import {ref, deleteObject} from "firebase/storage";
import {doc, deleteDoc} from "firebase/firestore";

// components
import {firebase, storage} from "./config";
import {cardState} from "../store";
import {getData} from "./index";

/**
 * Delete data from firebase
 **/
const deleteData = (id, fileName) => {
  const desertRef = ref(storage, `/${fileName}.jpeg`);
  deleteObject(desertRef).then(() => {
    console.log("Image was deleted");
  }).catch((error) => {
    console.error(error);
  });

  deleteDoc(doc(firebase, "projects", id)).then(() => {
    console.log("Document was deleted")
  });

  cardState.filterCard.filter(data => data.id !== id);
  cardState.cardResult.filter(data => data.id !== id);
  cardState.card.filter(data => data.id !== id);

  getData().then(() => {
  });
};

export default deleteData;