import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, selectors, formValidationConfig } from "../utils/constants.js";
import '../pages/index.css';

// ! ||--------------------------------------------------------------------------------||
// ! ||                                    CONSTANTS                                   ||
// ! ||--------------------------------------------------------------------------------||
const addCardAddButton = document.querySelector(selectors.cardAddButton);
const updateProfileButton = document.querySelector(selectors.profileEditButton);
const cardFormElement = document.querySelector(selectors.cardPopup);
const profileFormElement = document.querySelector(selectors.profilePopup);
const profileHeadingInput = profileFormElement.querySelector(selectors.profileName);
const profileDescriptionInput = profileFormElement.querySelector(selectors.profileDescription);
const newImagePopup = new PopupWithImage(selectors.cardImagePopup);
newImagePopup.setEventListeners();
const editProfileFormValidator = new FormValidator(formValidationConfig, profileFormElement);
const cardFormValidator = new FormValidator(formValidationConfig, cardFormElement);
editProfileFormValidator.enableValidation();
cardFormValidator.enableValidation();

//INITIAL CARDS
const cardSection = new Section(
  { items: initialCards,
    renderer: (item) => {
      const card = renderCard(item);
      cardSection.addItem(card);
    }
  },
  selectors.cardSection,
);
cardSection.renderItems();

//NEW CARD
const newCardPopup = new PopupWithForm(
  selectors.cardPopup,
  handleAddCardFormSubmit
);
newCardPopup.setEventListeners();

//USER INFO
const userInfo = new UserInfo({
    nameSelector: selectors.profileHeadingElement,
    descriptionSelector: selectors.profileDescriptionElement
});

//USER PROFILE
const updateProfilePopup = new PopupWithForm(
  selectors.profilePopup,
  handleProfileSubmit
);
updateProfilePopup.setEventListeners();


function renderCard(item) {
  const card = new Card(item, selectors.cardTemplate, handleImageClick);
  return card.generateCard();
}

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Event Listeners                                ||
// ! ||--------------------------------------------------------------------------------||
addCardAddButton.addEventListener("click", () => {
  newCardPopup.open();
  cardFormValidator.toggleButtonState();
});

updateProfileButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileHeadingInput.value = userData.userName;
  profileDescriptionInput.value = userData.userDescription;
  editProfileFormValidator.resetValidation(); //editProfileFormValidator might need to change back Not sure what my mistake is//
  updateProfilePopup.open();
});

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Event Handlers                                 ||
// ! ||--------------------------------------------------------------------------------||
function handleAddCardFormSubmit(data) {
  const card = renderCard(data);
  cardSection.addItem(card);
}

function handleImageClick(name, link) {
  newImagePopup.open(name, link);
}

function handleProfileSubmit(userData) {
  userInfo.setUserInfo(userData);
}