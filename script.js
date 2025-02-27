let container = document.querySelector(".page");
let popup = container.querySelector(".popup");
popup.classList.remove("popup_opened");
let editButton = container.querySelector(".profile__edit-button");
let closeButton = container.querySelector(".popup__close-button");

function openPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
