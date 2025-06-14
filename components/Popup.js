class Popup {
  constructor(selector) {
    this._selector = selector;
    this._containerPopup = document.querySelector(selector);
  }

  open() {
    this._containerPopup.classList.add("popup_opened");
  }

  close() {
    this._containerPopup.classList.remove("popup_opened");
  }

  _handleEscClose(evt) {
    if (evt.key == "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._containerPopup.addEventListener("click", (evt) => {
      if (
        !evt.target.closest(".popup__container") ||
        evt.target.classList.contains("popup__close-button")
      ) {
        this.close();
      }
    });
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }
}

export { Popup };
