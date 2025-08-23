class Card {
  constructor(item, { templateSelector }, handleCardClick, handleLikeClick) {
    this._name = item.name;
    this._link = item.link;
    this._isLiked = item.isLiked;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
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
    const likeButton = this._item.querySelector(".gallery__like-button");

    imageCard.src = this._link;
    imageCard.alt = this._name;
    nameCard.textContent = this._name;
    this._isLiked
      ? likeButton.classList.add("gallery__like-button_active")
      : likeButton.classList.remove("gallery__like-button_active");

    this._setEventListeners();

    return this._item;
  }

  _likeOrDislikeCard(evt) {
    this._isLiked = !this._isLiked;
    this._isLiked
      ? evt.target.classList.add("gallery__like-button_active")
      : evt.target.classList.remove("gallery__like-button_active");
  }

  _removeCard(evt) {
    evt.target.closest(".gallery__photo-card").remove();
  }

  _setEventListeners() {
    this._item
      .querySelector(".gallery__like-button")
      .addEventListener("click", (evt) => {
        this._handleLikeClick(evt);
      });
    this._item
      .querySelector(".gallery__remove-button")
      .addEventListener("click", (evt) => {
        this._removeCard(evt);
      });
    this._item
      .querySelector(".gallery__photo")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }
}

export { Card };
