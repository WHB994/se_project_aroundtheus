import { selectors } from "../utils/constants.js";

export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._buttonElement = this._popupElement.querySelector(selectors.closeButton);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._buttonElement.addEventListener("click", () => this.close());
    this._popupElement.addEventListener("mousedown", (event) => {
      if (event.target.classList.contains("modal_opened")) {
        this.close();
      }
    });
  }

  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };
}