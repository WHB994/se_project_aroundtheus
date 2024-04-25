import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupConfirm from"../components/PopupConfirm.js";
import UserInfo from "../components/UserInfo.js";
import { selectors, formValidationConfig } from "../utils/constants.js";
import "../pages/index.css";
import { data } from "autoprefixer";

// ! ||--------------------------------------------------------------------------------||
// ! ||                                    CONSTANTS                                   ||
// ! ||--------------------------------------------------------------------------------||
const addCardAddButton = document.querySelector(selectors.cardAddButton);
const updateProfileButton = document.querySelector(selectors.profileEditButton);
const cardFormElement = document.querySelector(selectors.cardPopup);
const profileFormElement = document.querySelector(selectors.profilePopup);
const avatarFormElement = document.querySelector(selectors.avatarPopup);
const profileHeadingInput = profileFormElement.querySelector(selectors.profileName);
const profileDescriptionInput = profileFormElement.querySelector(selectors.profileDescription);
const newImagePopup = new PopupWithImage(selectors.cardImagePopup);
const updateAvatarButton = document.querySelector(selectors.avatarEditButton);
const avatarURLInput = profileFormElement.querySelector(selectors.avatarURL);
newImagePopup.setEventListeners();
const editProfileFormValidator = new FormValidator(formValidationConfig, profileFormElement);
const cardFormValidator = new FormValidator(formValidationConfig, cardFormElement);
const updateAvatarFormValidator = new FormValidator(formValidationConfig, avatarFormElement);

handleValidation(editProfileFormValidator);
handleValidation(cardFormValidator);
handleValidation(updateAvatarFormValidator);

const api = new Api({
  baseURL: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "88b806e8-38c4-4e0a-8ef0-73fdc149b74c",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
nameSelector: selectors.profileHeadingElement,
  descriptionSelector: selectors.profileDescriptionElement,
  avatarSelector: selectors.avatarImageElement,
});

let cardSection;
api
  .initialPageLoad()
  .then(([cards, user]) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: (item) => {
          const card = renderCard(item);
          cardSection.addItem(card);
        },
      },
      selectors.cardSection
    );
    cardSection.renderItems();
    userInfo.setUserInfo(user);
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
  });

//USER PROFILE
const updateProfilePopup = new PopupWithForm(
  selectors.profilePopup,
  handleProfileSubmit
);
updateProfilePopup.setEventListeners();

const newCardPopup = new PopupWithForm(
  selectors.cardPopup,
  handleAddCardFormSubmit
);
newCardPopup.setEventListeners();

function renderCard(item) {
  const card = new Card(
    item,
    selectors.cardTemplate,
    handleImageClick,
    handleDeleteCard,
    handleLikeIcon
  );
  return card.generateCard();
}

const deletePopup = new PopupConfirm(
  selectors.deletePopup,
  handleDeleteCard
);
deletePopup.setEventListeners();

//EDIT AVATAR
const avatarPopup = new PopupWithForm(
  selectors.avatarPopup,
  handleEditAvatar
);
avatarPopup.setEventListeners();

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Event Listeners                                ||
// ! ||--------------------------------------------------------------------------------||
addCardAddButton.addEventListener("click", () => {
  newCardPopup.open();
  cardFormValidator.toggleButtonState();
});

updateProfileButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileHeadingInput.value = userData.name;
  profileDescriptionInput.value = userData.about;
  editProfileFormValidator.resetValidation(); 
  updateProfilePopup.open();
});

updateAvatarButton.addEventListener("click", () => {
  avatarPopup.open();
});

function handleValidation(form) {
  form.enableValidation();
}


function handleAddCardFormSubmit(data) {
  this.showButtonProgress(true);
  api
    .addNewCard(data.name, data.link)
    .then((res) => {
      const card = renderCard(res);
      cardSection.addItem(card);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
    this.showButtonProgress(false);
}

function handleImageClick(name, link) {
  newImagePopup.open(name, link);
}

function handleProfileSubmit(userData) {
  this.showButtonProgress(true);
  api
    .updateUserInfo(userData.name, userData.about)
    .then((user) => {
      userInfo.setUserInfo(user);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
    this.showButtonProgress(false);
}

function handleDeleteCard(_id) {
}
deletePopup.open();
  deletePopup.setSubmitAction(() => {
    api
    .deleteCard(_id)
      .then((res) => {
        this.handleRemoveCard();
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  });


function handleLikeIcon(_id, _isLiked) {
  api
    .setLike(_id, _isLiked)
    .then((res) => {
      this.handleLikeIcon(res.isLiked);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
}

function handleEditAvatar(data) {
  this.showButtonProgress(true);
  api
    .updateProfilePicture(data.avatar)
    .then((user) => {
      userInfo.setUserAvatar(user.avatar);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
    this.showButtonProgress(false);
}