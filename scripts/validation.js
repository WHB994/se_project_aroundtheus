function showInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(errorClass);
  }
  
  function hideInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(errorClass);
  }
  
  function checkInputValidity(formElement, options, inputElement) {
    if (!inputElement.validity.valid) {
      return showInputError(formElement, inputElement, options);
    }
  
    hideInputError(formElement, inputElement, options);
  }
  
  function hasInvalidInput(inputList) {
    return !inputList.every((inputElement) => inputElement.validity.valid);
  }
  
  function disableButton(submitButtonElement, inactiveButtonClass) {
      submitButtonElement.classList.add(inactiveButtonClass);
      submitButtonElement.disabled = true;
  }
  
  function enableButton(submitButtonElement, inactiveButtonClass) {
      submitButtonElement.classList.remove(inactiveButtonClass);
      submitButtonElement.disabled = false;
  }
  
  function toggleButtonState(inputElements, submitButtonElement, {inactiveButtonClass}) {
    if (hasInvalidInput(inputElements)) {
      disableButton(submitButtonElement, inactiveButtonClass);
      return;
    }
    enableButton(submitButtonElement, inactiveButtonClass);
  }
  
  function setEventListeners(formElement, options) {
    const {inputSelector} = options;
    const inputElements = [...formElement.querySelectorAll(inputSelector)];
    const submitButtonElement = formElement.querySelector(options.submitButtonSelector);
  
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        checkInputValidity(formElement, options, inputElement);
        toggleButtonState(inputElements, submitButtonElement, options);
      });
    });
  }
  
  function enableValidation(options) {
    const formElements = [...document.querySelectorAll(options.formSelector)];
    formElements.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
  
      setEventListeners(formElement, options);
    });
  }
  
  const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
  }
  
  enableValidation(config);