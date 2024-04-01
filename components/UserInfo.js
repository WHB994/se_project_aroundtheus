export default class UserInfo {
    constructor({nameSelector, descriptionSelector}) {
      this._nameElement = document.querySelector(nameSelector);
      this._descriptionElement = document.querySelector(descriptionSelector);
    }
  
    getUserInfo() {
      return {
        userName: this._nameElement.textContent,
        userDescription: this._descriptionElement.textContent
      }
    }
  
    setUserInfo(userData) {
      this._nameElement.textContent = userData.name;
      this._descriptionElement.textContent = userData.description;
    }
  }