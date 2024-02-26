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
  ];
  
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
  
  //page elements
  const profileFormElement = document.querySelector("#profile-edit-modal");
  const cardFormElement = addCardModal.querySelector(".modal__form");
  
  const profileHeading = document.querySelector(".profile__heading");
  const profileDescription = document.querySelector(".profile__description");
  
  const addCardTitle = document.querySelector(".card__title");
  const addCardURL = document.querySelector(".card__image");
  
  const cardsList = document.querySelector(".cards__list");
  const cardTemplate =
    document.querySelector("#card-template").content.firstElementChild;
  
  const closeButtons = document.querySelectorAll(".modal__close");
  
  // ! ||--------------------------------------------------------------------------------||
  // ! ||                                    Functions                                   ||
  // ! ||--------------------------------------------------------------------------------||
  
  function closePopUp(modal) {
    modal.classList.remove("modal_opened");
  }
  
  function openPopUp(modal) {
    modal.classList.add("modal_opened");
  }
  
  function getCardElement(cardData) {
    //Get templates and elements
    const cardElement = cardTemplate.cloneNode(true);
    const cardTitle = cardElement.querySelector(".card__title");
    const cardImage = cardElement.querySelector(".card__image");
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const cardPreviewTitle = imagePreviewModal.querySelector(".preview-image__description");
    const cardPreviewImage = imagePreviewModal.querySelector(".preview-image__image");
  
    //Like and Delete
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });
    deleteButton.addEventListener("click", () => cardElement.remove());
  
    //Image Preview Popup
    cardImage.addEventListener("click", () => {
      cardPreviewTitle.textContent = cardData.name;
      cardPreviewImage.setAttribute("src", cardData.link);
      cardPreviewImage.setAttribute("alt", cardData.name);
      openPopUp(imagePreviewModal);
    });
  
    //Populate card values
    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    return cardElement;
  }
  
  function renderCard(cardData, wrapper) {
    const cardElement = getCardElement(cardData);
    wrapper.prepend(cardElement);
  }
  
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
    renderCard({name, link}, cardsList);
    e.target.reset();
    closePopUp(addCardModal);
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
  
  
  profileFormElement.addEventListener("submit", handleProfileEditSubmit);
  cardFormElement.addEventListener("submit", handleAddCardFormSubmit);
  
  initialCards.forEach((cardData) => renderCard(cardData, cardsList));
  closeButtons.forEach((button) => {
    const modal = button.closest(".modal");
    button.addEventListener("click", () => closePopUp(modal));
  });