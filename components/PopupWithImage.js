import Popup from "./Popup.js";
import { selectors } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = this._popupElement.querySelector(selectors.cardImage);
  }

  open(name, link) {
    this._popupElement.querySelector(selectors.cardDescription).textContent = name;

    this._popupImage.src = link;
    this._popupImage.alt = name;
    super.open();
  }
}