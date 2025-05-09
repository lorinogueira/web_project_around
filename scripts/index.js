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
  const imageCard = cardTemplate.querySelector(".gallery__photo");
  imageCard.src = card.link;
  imageCard.alt = card.name;

  document.querySelector(".gallery").prepend(cardTemplate);
};

const likeOrDislikeCard = (container) => {
  container.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("gallery__like-button")) {
      evt.target.classList.toggle("gallery__like-button_active");
    }
  });
};

const removeCard = (container) => {
  container.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("gallery__remove-button")) {
      evt.target.closest(".gallery__photo-card").remove();
    }
  });
};

const openImagePopup = (container) => {
  container.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("gallery__photo")) {
      const imagePopup = container.querySelector(".popup_function_open-image");
      imagePopup.classList.add("popup_opened");

      const imageName = evt.currentTarget.querySelector(
        ".gallery__photo-caption"
      );
      imagePopup.querySelector(".popup__photo-caption").textContent =
        imageName.textContent;

      const imageCard = evt.target;
      imagePopup
        .querySelector(".popup__photo")
        .setAttribute("src", imageCard.src);

      closeImagePopup(container);
    }
  });
};

const closeImagePopup = (container) => {
  container.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close-button")) {
      const imagePopup = container.querySelector(".popup_function_open-image");
      imagePopup.classList.remove("popup_opened");
    }
  });
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

initialCards.forEach(loadCard);
likeOrDislikeCard(container);
removeCard(container);
openImagePopup(container);
closePopup();

editProfileButton.addEventListener("click", openProfilePopup);
formProfile.addEventListener("submit", handleProfileFormSubmit);

addCardButton.addEventListener("click", openAddCardPopup);
formCard.addEventListener("submit", handleCardFormSubmit);
