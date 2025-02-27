const container = document.querySelector(".page");
const popup = container.querySelector(".popup");
popup.classList.remove("popup_opened");

const formElement = container.querySelector(".popup__form");
const nameInput = container.querySelector(".popup__input_content_name");
const aboutmeInput = container.querySelector(".popup__input_content_aboutme");
const nameProfile = container.querySelector(".profile__name");
const aboutmeProfile = container.querySelector(".profile__aboutme");

const editButton = container.querySelector(".profile__edit-button");
const closeButton = container.querySelector(".popup__close-button");
const submitButton = container.querySelector(".popup__submit-button");

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
