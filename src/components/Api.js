export default class Api {
    constructor({ baseURL, headers }) {
      this._baseURL = baseURL;
      this._headers = headers;
    }
  
    _checkResponse(res) {if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }
  
    getInitialCards() {
      return fetch(`${this._baseURL}/cards`, {
        headers: this._headers,
      }).then((res) => {
        return this._checkResponse(res);
      });
    }
  
    getUserInfo() {
      return fetch(`${this._baseURL}/users/me`, {
        headers: this._headers,
      }).then((res) => {
        return this._checkResponse(res);
      });
    }
  
    updateUserInfo(name, about) {
      return fetch(`${this._baseURL}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name,
          about,
        }),
      }).then((res) => {
        return this._checkResponse(res);
      });
    }
  
    addNewCard(name, link) {
      return fetch(`${this._baseURL}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name,
          link,
        }),
      }).then((res) => {
        return this._checkResponse(res);
      });
    }
  
    deleteCard(_id) {
      return fetch(`${this._baseURL}/cards/${_id}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => {
        return this._checkResponse(res);
      });
    }
  
    setLike(_id, isLiked) {
      return fetch(`${this._baseURL}/cards/${_id}/likes`, {
        method: isLiked ? "DELETE" : "PUT",
        headers: this._headers,
      }).then((res) => this._checkResponse(res));
    }
  
    updateProfilePicture(avatar) {
      return fetch(`${this._baseURL}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar,
        }),
      }).then((res) => {
        return this._checkResponse(res);
      });
    }
  
    initialPageLoad() {
      return Promise.all([this.getInitialCards(), this.getUserInfo()]);
    }
}