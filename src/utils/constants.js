
  
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
    avatarImageElement: ".profile__image",
    deletePopup: "#delete-modal",
    avatarPopup: "#avatar-edit-modal",
    avatarEditButton: "#avatar-profile-edit-button",
    avatarURL: ".modal__input_type_url",
    savingButtonText: "Saving...",
    submitButtonSelector: ".modal__button",
    saveButtonDefaultText: "Save",
    deletingButtonDefaultText: "Yes",
    deletingButtonText: "Deleting...",
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