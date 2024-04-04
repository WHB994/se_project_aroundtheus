import { cardselectors } from "../utils/constants.js";

export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector(cardselectors.cardLike);
    this._deleteButton = this._cardElement.querySelector(cardselectors.cardDelete);
    this._cardTitleElement = this._cardElement.querySelector(cardselectors.cardTitle);
    this._cardImageElement = this._cardElement.querySelector(cardselectors.cardImage);
  }

  _getTemplate() {
    return document
    .querySelector(this._cardSelector)
    .content.querySelector(".card")
    .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._deleteButton.addEventListener("click", () => {
        this._handleDeleteCard();
    });

    this._cardImageElement.addEventListener('click', () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle(cardselectors.cardLikeToggle);
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  generateCard() {
    this._cardTitleElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}