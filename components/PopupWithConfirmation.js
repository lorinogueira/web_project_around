import { Popup } from "../components/Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);
  }

  open() {
    super.open();
    this.setEventListeners();
  }
}

export { PopupWithConfirmation };
