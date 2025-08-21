import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

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

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item,
        { templateSelector: "#card-template" },
        () => {
          const popupWithImage = new PopupWithImage(
            ".popup_function_open-image"
          );
          popupWithImage.open(item);
        }
      );
      return card.generateCard();
    },
  },
  ".gallery"
);
cardList.renderItems();

const formList = Array.from(document.querySelectorAll(".popup__form"));

formList.forEach((form) => {
  const formValidator = new FormValidator(
    { inputSelector: ".popup__input" },
    form
  );
  formValidator.enableValidation();
});

const popupWithFormAddCard = new PopupWithForm(
  ".popup_function_add-card",
  (item) => {
    const card = new Card(item, { templateSelector: "#card-template" }, () => {
      const popupWithImage = new PopupWithImage(".popup_function_open-image");
      popupWithImage.open(item);
    });
    cardList.addItem(card.generateCard());
  }
);
popupWithFormAddCard.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar",
});

const api = new Api();

api
  .getInfoFromApi("https://around-api.pt-br.tripleten-services.com/v1/users/me")
  .then((info) => {
    userInfo.setUserInfo({
      name: info.name,
      about: info.about,
      avatar: info.avatar,
    });
  });

const popupWithFormEditProfile = new PopupWithForm(
  ".popup_function_edit-profile",
  (item) => {
    userInfo.setUserInfo(item);
  }
);
popupWithFormEditProfile.setEventListeners();

const addCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");

addCardButton.addEventListener("click", () => {
  popupWithFormAddCard.open();
});

editProfileButton.addEventListener("click", () => {
  popupWithFormEditProfile.open(userInfo.getUserInfo());
});
