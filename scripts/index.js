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
const titleInput = addCardPopup.querySelector(
  ".popup__input_content_title-card"
);
const linkInput = addCardPopup.querySelector(".popup__input_content_link");

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

const loadCard = (card) => {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.cloneNode("true");
  cardTemplate.querySelector(".gallery__photo-caption").textContent = card.name;

  const ImageCard = cardTemplate.querySelector(".gallery__photo");
  ImageCard.setAttribute("src", card.link);

  // Evento de curtir - aplicar teoria Propagação e Delegação de Eventos (cap 3)
  const likeCardButton = cardTemplate.querySelector(".gallery__like-button");
  likeCardButton.addEventListener("click", () => {
    likeCardButton.classList.toggle("gallery__like-button_active");
  });

  // Evemto de remover - aplicar teoria Propagação e Delegação de Eventos (cap 3)
  const removeCardButton = cardTemplate.querySelector(
    ".gallery__remove-button"
  );
  removeCardButton.addEventListener("click", () => {
    initialCards.pop(card);
    removeCardButton.closest(".gallery__photo-card").remove();
  });

  // Evento de abrir popup da imagem - aplicar teoria Propagação e Delegação de Eventos (cap 3)
  ImageCard.addEventListener("click", () => {
    const imagePopup = document.querySelector(".popup_funtion_open-image");
    imagePopup.classList.add("popup_opened");
    imagePopup.querySelector(".popup__photo-caption").textContent = card.name;
    imagePopup.querySelector(".popup__photo").setAttribute("src", card.link);

    // Evento de fechar popup da imagem - aplicar teoria Propagação e Delegação de Eventos (cap 3)
    const closeImagePopupButton = imagePopup.querySelector(
      ".popup__close-button"
    );
    closeImagePopupButton.addEventListener("click", () => {
      imagePopup.classList.remove("popup_opened");
    });
  });

  document.querySelector(".gallery").prepend(cardTemplate);
};

const openOrCloseProfilePopup = () => {
  editProfilePopup.classList.toggle("popup_opened");
  nameInput.value = nameProfile.textContent;
  aboutmeInput.value = aboutmeProfile.textContent;
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  aboutmeProfile.textContent = aboutmeInput.value;

  openOrCloseProfilePopup();
};

const openOrCloseAddCardPopup = () => {
  addCardPopup.classList.toggle("popup_opened");
  formCard.reset();
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();

  const newCard = { name: titleInput.value, link: linkInput.value };
  initialCards.push(newCard);
  loadCard(newCard);

  openOrCloseAddCardPopup();
};

const showError = (input, errorMessage) => {
  const inputError = document.querySelector(`.${input.id}-error`);
  input.classList.add("popup__input_type_error");
  inputError.textContent = errorMessage;
  inputError.classList.add("popup__input-error_active");
};

const hideError = (input) => {
  const inputError = document.querySelector(`.${input.id}-error`);
  input.classList.remove("popup__input_type_error");
  inputError.textContent = "";
  inputError.classList.remove("popup__input-error_active");
};

const checkInputValidity = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((form) => {
    const inputList = Array.from(form.querySelectorAll(".popup__input"));
    inputList.forEach((input) => {
      if (!input.validity.valid) {
        showError(input, input.validationMessage);
      } else {
        hideError(input);
      }
    });
  });
};

initialCards.forEach(loadCard);

editProfileButton.addEventListener("click", openOrCloseProfilePopup);
closeEditProfileButton.addEventListener("click", openOrCloseProfilePopup);
formProfile.addEventListener("input", checkInputValidity);
formProfile.addEventListener("submit", handleProfileFormSubmit);

addCardButton.addEventListener("click", openOrCloseAddCardPopup);
closeAddCardButton.addEventListener("click", openOrCloseAddCardPopup);
formCard.addEventListener("input", checkInputValidity);
formCard.addEventListener("submit", handleCardFormSubmit);
