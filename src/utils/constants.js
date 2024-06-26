export const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
      },
      {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
      },
      {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
      },
      {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
      },
      {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
      },
      {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
      },
  ]
  
  export const selectors = {
    cardSection: ".cards__list",
    cardTemplate: "#card-template",
    cardPopup: "#add-card-modal",
    cardImagePopup: "#image-preview-modal",
    cardImage: ".preview-image__image",
    cardDescription: ".preview-image__description",
    cardAddButton: "#add-card-add-button",
    popupForm: ".modal__form",
    popupInput: ".modal__input",
    closeButton: ".modal__close",
    profilePopup: "#profile-edit-modal",
    profileEditButton: "#profile-edit-button",
    profileName: ".modal__input_type_name",
    profileDescription: ".modal__input_type_description",
    profileHeadingElement: ".profile__heading",
    profileDescriptionElement: ".profile__description",
  }
  
  export const formValidationConfig = {
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
  }
  
  export const cardselectors = {
    cardDelete: ".card__delete-button",
    cardLike: ".card__like-button",
    cardLikeToggle: "card__like-button_active",
    cardTitle: ".card__title",
    cardImage: ".card__image",
  }