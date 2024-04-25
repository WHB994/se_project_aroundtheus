import Popup from "./Popup.js";
import { selectors } from "../utils/constants.js";

export default class PopupConfirm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super({ popupSelector });
        this._popupForm = this._popupElement.querySelector(selectors.popupForm);
        this._handleFormSubmit = handleFormSubmit;
      }
    
      setEventListeners() {
        this._popupForm.addEventListener("submit", (event) => {
          event.preventDefault();
          this._handleFormSubmit();
          this.close();
        });
        super.setEventListeners();
      }
    
      setSubmitAction(action) {
        this._handleFormSubmit = action;
      }
    }