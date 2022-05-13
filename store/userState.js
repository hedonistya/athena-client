import {makeAutoObservable} from "mobx";

class UserState {
  users = [
    // {
    //   name: 'Никита Топольсков-Дердяй',
    //   photo: 'Никита Топольсков-Дердяй',
    //   owner: true,
    //   permission: true,
    //   code: 'HunQaOTWcP'
    // },
  ];
  username = "";


  constructor() {
    makeAutoObservable(this);
  };

  setUsername(username) {
    this.username = username;
  }


}

export default new UserState();