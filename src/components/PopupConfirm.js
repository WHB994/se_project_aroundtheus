import Popup from "./Popup.js";
import { selectors } from "../utils/constants.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(selectors.popupForm);
    this._submitButtonElement = this._popupElement.querySelector(selectors.submitButtonSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._progressButtonText = selectors.deletingButtonText;
    this._defaultButtonText = selectors.deletingButtonDefaultText;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit();
    });
    super.setEventListeners();
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  showButtonProgress(showButtonProgress) {
    if (showButtonProgress) {
      this._submitButtonElement.textContent = this._progressButtonText;
    } else {
     this._submitButtonElement.textContent = this._defaultButtonText;
    }
  };
}