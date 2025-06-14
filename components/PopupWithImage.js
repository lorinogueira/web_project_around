import { Popup } from "../components/Popup.js";

class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open({ name, link }) {
    super.open();
    this._containerPopup.querySelector(".popup__photo-caption").textContent =
      name;
    this._containerPopup
      .querySelector(".popup__photo")
      .setAttribute("src", link);

    this.setEventListeners();
  }
}

export { PopupWithImage };
