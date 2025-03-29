const container = document.querySelector(".page");
const popups = container.querySelectorAll(".popup");
popups.forEach((popup) => popup.classList.remove("popup_opened"));

const editProfilePopup = container.querySelector(
  ".popup_function_edit-profile"
);
const formElement = editProfilePopup.querySelector(".popup__form");
const nameInput = editProfilePopup.querySelector(".popup__input_content_name");
const aboutmeInput = editProfilePopup.querySelector(
  ".popup__input_content_aboutme"
);
const nameProfile = container.querySelector(".profile__name");
const aboutmeProfile = container.querySelector(".profile__aboutme");

const addCardPopup = container.querySelector(".popup_function_add-card");

const editProfileButton = container.querySelector(".profile__edit-button");
const closeEditProfileButton = editProfilePopup.querySelector(
  ".popup__close-button"
);
const addCardButton = container.querySelector(".profile__add-button");
const closeAddCardButton = addCardPopup.querySelector(".popup__close-button");

function openOrCloseProfilePopup() {
  editProfilePopup.classList.toggle("popup_opened");
  nameInput.value = nameProfile.textContent;
  aboutmeInput.value = aboutmeProfile.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  aboutmeProfile.textContent = aboutmeInput.value;

  openOrCloseProfilePopup();
}

function openOrCloseAddCardPopup() {
  addCardPopup.classList.toggle("popup_opened");
}

editProfileButton.addEventListener("click", openOrCloseProfilePopup);
closeEditProfileButton.addEventListener("click", openOrCloseProfilePopup);
formElement.addEventListener("submit", handleProfileFormSubmit);
addCardButton.addEventListener("click", openOrCloseAddCardPopup);
closeAddCardButton.addEventListener("click", openOrCloseAddCardPopup);
