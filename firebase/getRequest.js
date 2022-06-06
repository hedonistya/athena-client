import {collection, getDocs} from "firebase/firestore";
import {ref, getDownloadURL} from "firebase/storage";

// components
import {firebase, storage} from "./config";
import {cardState, userState} from "../store";

/**
 * Get data from firebase
 **/
const getData = async () => {
  cardState.setCard([]);
  cardState.setFilterCard([]);
  cardState.setCardImage([]);
  let count = 0;
  const querySnapshot = await getDocs(collection(firebase, 'projects'));
  if (localStorage.getItem("displayNameAthena")) {
    querySnapshot.forEach((doc) => {
      if (localStorage.getItem("displayNameAthena") === doc.data().username) {
        getDownloadURL(ref(storage, `/${doc.data().code}.jpeg`))
          .then((url) => {
            cardState.card.push({
              id: doc.id,
              title: doc.data().title,
              code: doc.data().code,
              ownerName: doc.data().ownerName,
              username: doc.data().username,
              image: url
            });
          });
        count++;
      }
    });
    if (count === 0) {
      alert('У вас нет проектов');
    }
    cardState.setFilterCard(cardState.card);
    userState.setUsername(localStorage.getItem("displayNameAthena"));
  } else {
    alert("Войдите в аккаунт");
  }
};

export default getData;