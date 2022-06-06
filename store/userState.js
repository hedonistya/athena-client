import {makeAutoObservable} from "mobx";

class UserState {
  users = [
    // {
    //   name: localStorage.getItem("displayNameAthena") || "",
    //   photo: localStorage.getItem("userAvatarAthena") || "",
    //   owner: localStorage.getItem("ownerAthena") || "",
    //   code: localStorage.getItem("codeAthena") || "",
    //   boardTitle: localStorage.getItem("boardTitleAthena") || "",
    // }
  ];
  username = "";

  constructor() {
    makeAutoObservable(this);
  };

  setUsers(users) {
    this.users = users;
  };

  setUsername(username) {
    this.username = username;
  };
}

export default new UserState();