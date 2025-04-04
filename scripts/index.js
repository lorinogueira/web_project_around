const container = document.querySelector(".page");
const popups = container.querySelectorAll(".popup");
popups.forEach((popup) => popup.classList.remove("popup_opened"));

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
let titleInput = addCardPopup.querySelector(".popup__input_content_title-card");
let linkInput = addCardPopup.querySelector(".popup__input_content_link");

const editProfileButton = container.querySelector(".profile__edit-button");
const closeEditProfileButton = editProfilePopup.querySelector(
  ".popup__close-button"
);
const addCardButton = container.querySelector(".profile__add-button");
const closeAddCardButton = addCardPopup.querySelector(".popup__close-button");

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

function loadCards(card) {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.cloneNode("true");
  cardTemplate.querySelector(".gallery__photo-caption").textContent = card.name;
  const ImageCard = cardTemplate.querySelector(".gallery__photo");
  ImageCard.setAttribute("src", card.link);

  const likeCardButton = cardTemplate.querySelector(".gallery__photo-button");
  likeCardButton.addEventListener("click", () => {
    likeCardButton.classList.toggle("gallery__photo-button_active");
  });

  const removeCardButton = cardTemplate.querySelector(
    ".gallery__remove-button"
  );
  removeCardButton.addEventListener("click", () => {
    initialCards.pop(card);
    removeCardButton.closest(".gallery__photo-card").remove();
  });

  ImageCard.addEventListener("click", () => {
    const imagePopup = document.querySelector(".popup_funtion_open-image");
    imagePopup.classList.add("popup_opened");
    imagePopup.querySelector(".popup__photo-caption").textContent = card.name;
    imagePopup.querySelector(".popup__photo").setAttribute("src", card.link);

    const closeImagePopupButton = imagePopup.querySelector(
      ".popup__close-button"
    );
    closeImagePopupButton.addEventListener("click", () => {
      imagePopup.classList.remove("popup_opened");
    });
  });

  document.querySelector(".gallery").prepend(cardTemplate);
}

initialCards.forEach(loadCards);

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
  titleInput.value = "";
  linkInput.value = "";
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const novoCard = { name: titleInput.value, link: linkInput.value };
  initialCards.push(novoCard);
  loadCards(novoCard);

  openOrCloseAddCardPopup();
}

editProfileButton.addEventListener("click", openOrCloseProfilePopup);
closeEditProfileButton.addEventListener("click", openOrCloseProfilePopup);
formProfile.addEventListener("submit", handleProfileFormSubmit);

addCardButton.addEventListener("click", openOrCloseAddCardPopup);
closeAddCardButton.addEventListener("click", openOrCloseAddCardPopup);
formCard.addEventListener("submit", handleCardFormSubmit);
