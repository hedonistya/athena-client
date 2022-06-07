import {makeAutoObservable} from "mobx";

class UserState {
  username = "";

  constructor() {
    makeAutoObservable(this);
  };

  setUsername(username) {
    this.username = username;
  };
}

export default new UserState();