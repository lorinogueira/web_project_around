import { Popup } from "../components/Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(selector, handleFormConfirmation) {
    super(selector);
    this._handleFormConfirmation = handleFormConfirmation;
  }

  open() {
    super.open();
    this.setEventListeners();
  }

  setEventListeners() {
    super.setEventListeners();
    this._containerPopup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormConfirmation();
      this.close();
    });
  }
}

export { PopupWithConfirmation };
