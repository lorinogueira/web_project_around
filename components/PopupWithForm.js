import { Popup } from "../components/Popup.js";

class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputList = Array.from(
      this._containerPopup.querySelectorAll(".popup__input")
    );

    const inputValues = inputList.reduce((acc, { name, value }) => {
      acc[name] = value;
      return acc;
    }, {});

    return inputValues;
  }

  open(userInfo) {
    super.open();
    if (this._selector == ".popup_function_edit-profile") {
      const nameInput = this._containerPopup.querySelector(
        ".popup__input_content_name"
      );
      const aboutInput = this._containerPopup.querySelector(
        ".popup__input_content_about"
      );
      nameInput.value = userInfo.name;
      aboutInput.value = userInfo.about;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._containerPopup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._containerPopup.querySelector(".popup__form").reset();
    const button = this._containerPopup.querySelector(".popup__submit-button");
    button.classList.add("popup__submit-button_inactive");
    button.setAttribute("disabled", "");
  }
}

export { PopupWithForm };
