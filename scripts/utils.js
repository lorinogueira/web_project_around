import { loadCard } from "./index.js";

const container = document.querySelector(".page");

const editProfilePopup = container.querySelector(
  ".popup_function_edit-profile"
);
const formProfile = editProfilePopup.querySelector(".popup__form");
const nameInput = editProfilePopup.querySelector(".popup__input_content_name");
const aboutmeInput = editProfilePopup.querySelector(
  ".popup__input_content_aboutme"
);
const nameProfile = container.querySelector(".profile__name");
const aboutmeProfile = container.querySelector(".profile__aboutme");

const addCardPopup = container.querySelector(".popup_function_add-card");
const formCard = addCardPopup.querySelector(".popup__form");
const titleInput = addCardPopup.querySelector(
  ".popup__input_content_title-card"
);
const linkInput = addCardPopup.querySelector(".popup__input_content_link");

const editProfileButton = container.querySelector(".profile__edit-button");
const addCardButton = container.querySelector(".profile__add-button");

const openProfilePopup = () => {
  editProfilePopup.classList.add("popup_opened");
  nameInput.value = nameProfile.textContent;
  aboutmeInput.value = aboutmeProfile.textContent;
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  aboutmeProfile.textContent = aboutmeInput.value;
};

const openAddCardPopup = () => {
  addCardPopup.classList.add("popup_opened");
  formCard.reset();
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();

  const newCard = { name: titleInput.value, link: linkInput.value };
  loadCard(newCard);
};

const closePopup = () => {
  const popupList = Array.from(container.querySelectorAll(".popup"));
  popupList.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
      if (
        !evt.target.closest(".popup__container") ||
        evt.target.classList.contains("popup__close-button") ||
        evt.target.classList.contains("popup__submit-button")
      ) {
        popup.classList.remove("popup_opened");
      }
    });
    document.addEventListener("keydown", (evt) => {
      if (evt.key == "Escape") {
        popup.classList.remove("popup_opened");
      }
    });
  });
};

closePopup();

editProfileButton.addEventListener("click", openProfilePopup);
formProfile.addEventListener("submit", handleProfileFormSubmit);

addCardButton.addEventListener("click", openAddCardPopup);
formCard.addEventListener("submit", handleCardFormSubmit);
