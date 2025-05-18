class Card {
  constructor(item, { templateSelector }) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true);
    return cardTemplate;
  }

  generateCard() {
    this._item = this._getTemplate();

    const imageCard = this._item.querySelector(".gallery__photo");
    const nameCard = this._item.querySelector(".gallery__photo-caption");

    imageCard.src = this._link;
    imageCard.alt = this._name;
    nameCard.textContent = this._name;

    this._setEventListeners();

    return this._item;
  }

  _likeOrDislikeCard(evt) {
    evt.target.classList.toggle("gallery__like-button_active");
  }

  _removeCard(evt) {
    evt.target.closest(".gallery__photo-card").remove();
  }

  _openImagePopup() {
    const imagePopup = document.querySelector(".popup_function_open-image");
    imagePopup.classList.add("popup_opened");
    imagePopup.querySelector(".popup__photo-caption").textContent = this._name;
    imagePopup.querySelector(".popup__photo").setAttribute("src", this._link);
  }

  _setEventListeners() {
    this._item
      .querySelector(".gallery__like-button")
      .addEventListener("click", (evt) => {
        this._likeOrDislikeCard(evt);
      });
    this._item
      .querySelector(".gallery__remove-button")
      .addEventListener("click", (evt) => {
        this._removeCard(evt);
      });
    this._item
      .querySelector(".gallery__photo")
      .addEventListener("click", () => {
        this._openImagePopup();
      });
  }
}

export { Card };
