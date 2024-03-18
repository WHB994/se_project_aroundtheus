import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
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

// ! ||--------------------------------------------------------------------------------||
// ! ||                                    Form Elements                               ||
// ! ||--------------------------------------------------------------------------------||

//edit profile modal
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileCloseModalButton = profileEditModal.querySelector(
  ".modal__close"
);
//add card modal
const addCardModal = document.querySelector("#add-card-modal");
const addCardAddButton = document.querySelector("#add-card-add-button");
const addCardCloseModalButton = addCardModal.querySelector(
  ".modal__close"
);
//image preview modal
const imagePreviewModal = document.querySelector("#image-preview-modal");
const imagePreviewCloseModalButton = imagePreviewModal.querySelector(
  ".modal__close_type_preview"
);

//edit profile form inputs
const profileHeadingInput = profileEditModal.querySelector(".modal__input_type_name");
const profileDescriptionInput = profileEditModal.querySelector(
  ".modal__input_type_description"
);
//add card form inputs
const addCardTitleInput = addCardModal.querySelector(".modal__input_type_title");
const addCardURLInput = addCardModal.querySelector(
  ".modal__input_type_url"
);
//modals
const modals = document.querySelectorAll(".modal");

//page elements
const profileFormElement = document.querySelector("#profile-edit-modal");
const cardFormElement = document.querySelector("#add-card-modal");

const profileHeading = document.querySelector(".profile__heading");
const profileDescription = document.querySelector(".profile__description");

const cardsList = document.querySelector(".cards__list");
const closeButtons = document.querySelectorAll(".modal__close");

const cardPreviewTitle = imagePreviewModal.querySelector(".preview-image__description");
const cardPreviewImage = imagePreviewModal.querySelector(".preview-image__image");

// ! ||--------------------------------------------------------------------------------||
// ! ||                                    Functions                                   ||
// ! ||--------------------------------------------------------------------------------||

function closePopUp(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function openPopUp(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopUp(openedModal);
  }
}

//FUNCTION TO ADD CARDS
function renderCard(cardData, wrapper) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.generateCard();
  cardsList.prepend(cardElement);
}

//RENDER INITIAL CARDS
initialCards.forEach((cardData) => {
  renderCard(cardData);
});

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Event Handlers                                 ||
// ! ||--------------------------------------------------------------------------------||
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileHeading.textContent = profileHeadingInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardURLInput.value;
  renderCard({name, link});
  e.target.reset();
  cardFormValidator.toggleButtonState();
  closePopUp(addCardModal);
}

function handleImageClick(name, link) {
  cardPreviewTitle.textContent = name;
  cardPreviewImage.setAttribute("src", link);
  cardPreviewImage.setAttribute("alt", name);
  openPopUp(imagePreviewModal);
}

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Event Listeners                                ||
// ! ||--------------------------------------------------------------------------------||
profileEditButton.addEventListener("click", () => {
  profileHeadingInput.value = profileHeading.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopUp(profileEditModal);
});

addCardAddButton.addEventListener("click", () => {
  openPopUp(addCardModal);
});

modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closePopUp(modal);
    }
  });
});

profileFormElement.addEventListener("submit", handleProfileEditSubmit);
cardFormElement.addEventListener("submit", handleAddCardFormSubmit);

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closePopUp(modal));
});

const formValidationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
}

const editProfileFormValidator = new FormValidator(formValidationConfig, profileFormElement);
const cardFormValidator = new FormValidator(formValidationConfig, cardFormElement);

editProfileFormValidator.enableValidation();
cardFormValidator.enableValidation();