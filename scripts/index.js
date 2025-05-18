import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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

const loadCard = (item) => {
  const card = new Card(item, { templateSelector: "#card-template" });
  const cardElement = card.generateCard();

  document.querySelector(".gallery").prepend(cardElement);
};

initialCards.forEach((item) => {
  loadCard(item);
});

const formList = Array.from(document.querySelectorAll(".popup__form"));

formList.forEach((form) => {
  const formValidator = new FormValidator(
    { inputSelector: ".popup__input" },
    form
  );
  formValidator.enableValidation();
});

export { loadCard };
