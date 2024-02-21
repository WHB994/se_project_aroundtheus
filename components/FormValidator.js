export default class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
    }

    _showInputError(inputElement) {
        this._errorMessageElement = this._form.querySelector(
            `#${inputElement.id}-error`
        );

        inputElement.classList.add(this._inputErrorClass);
        this._errorMessageElement.textContent = inputElement.validationMessage;
        this._errorMessageElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        this._errorMessageElement = this._form.querySelector(
            `#${inputElement.id}-error`
        );

        inputElement.classList.remove(this._inputErrorClass);
        this._errorMessageElement.textContent = " ";
        this._errorMessageElement.classList.remove(this._errorClass);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            return this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput() {
        return !this._inputElements.every(
            (inputElement) => inputElement.validity.valid
        );
    }

    _disableButton() {
        this._submitButton.setAttribute("disabled", true);
        this._submitButton.classList.add(this._inactiveButtonClass);
    }

    _enableButton() {
        this._submitButton.removeAttribute("disabled");
        this._submitButton.classList.remove(this._inactiveButtonClass);
    }

    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._disableButton();
        } else {
            this._enableButton();
        }
    };

    _setEventListeners(settings) {
        this._inputElements = [
            ...this._form.querySelectorAll(this._inputSelector),
        ];
        this._submitButton = this._form.querySelector(
            this._submitButtonSelector
        );

        this._inputElements.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });

        this._toggleButtonState();
    }

    enableValidation() {
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
        });

        this._setEventListeners();
    }

    resetValidation() {
        this._inputElements.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });

        this._disableButton();
    }
}