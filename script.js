let container = document.querySelector(".page");
let popup = container.querySelector(".popup");
popup.classList.remove("popup_opened");

let formElement = container.querySelector(".popup__form");
let nameInput = container.querySelector(".popup__input_content_name");
let aboutmeInput = container.querySelector(".popup__input_content_aboutme");
let nameProfile = container.querySelector(".profile__name");
let aboutmeProfile = container.querySelector(".profile__aboutme");

let editButton = container.querySelector(".profile__edit-button");
let closeButton = container.querySelector(".popup__close-button");
let submitButton = container.querySelector(".popup__submit-button");

function openPopup() {
  popup.classList.add("popup_opened");
  nameInput.value = nameProfile.textContent;
  aboutmeInput.value = aboutmeProfile.textContent;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  aboutmeProfile.textContent = aboutmeInput.value;

  closePopup();
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", handleProfileFormSubmit);
