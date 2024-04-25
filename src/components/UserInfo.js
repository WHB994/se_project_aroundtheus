export default class UserInfo {
  constructor({nameSelector, descriptionSelector, avatarSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._descriptionElement.textContent,
      avatar: this._avatarElement.src,
    }
  }

  setUserInfo(userData) {
    this._nameElement.textContent = userData.name;
    this._descriptionElement.textContent = userData.about;
    this._avatarElement.src = userData.avatar;
  }
}
  setUserAvatar(userData); {
    this._avatarElement.src = userData;
    }
  