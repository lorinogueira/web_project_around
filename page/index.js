import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

const formList = Array.from(document.querySelectorAll(".popup__form"));

formList.forEach((form) => {
  const formValidator = new FormValidator(
    { inputSelector: ".popup__input" },
    form
  );
  formValidator.enableValidation();
});

const api = new Api();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar",
});

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
    api
      .updateProfile(
        "https://around-api.pt-br.tripleten-services.com/v1/users/me",
        item
      )
      .then((info) => {
        userInfo.setUserInfo({
          name: info.name,
          about: info.about,
          avatar: info.avatar,
        });
      });
  }
);
popupWithFormEditProfile.setEventListeners();

const cardList = new Section(
  {
    renderer: (item) => {
      const card = new Card(
        item,
        { templateSelector: "#card-template" },
        () => {
          const popupWithImage = new PopupWithImage(
            ".popup_function_open-image"
          );
          popupWithImage.open(item);
        },
        (evt) => {
          api
            .updateLike(
              `https://around-api.pt-br.tripleten-services.com/v1/cards/${item._id}/likes`,
              item
            )
            .then((updatedLike) => {
              item.isLiked = updatedLike.isLiked;
              evt.target.classList.toggle("gallery__like-button_active");
            });
        }
      );
      return card.generateCard();
    },
  },
  ".gallery"
);

api
  .getInfoFromApi("https://around-api.pt-br.tripleten-services.com/v1/cards/")
  .then((cardsFromApi) => {
    cardList.renderItems(cardsFromApi);
  });

const popupWithFormAddCard = new PopupWithForm(
  ".popup_function_add-card",
  (cardInfos) => {
    api
      .postCard(
        "https://around-api.pt-br.tripleten-services.com/v1/cards/",
        cardInfos
      )
      .then((item) => {
        const card = new Card(
          item,
          { templateSelector: "#card-template" },
          () => {
            const popupWithImage = new PopupWithImage(
              ".popup_function_open-image"
            );
            popupWithImage.open(item);
          },
          (evt) => {
            api
              .updateLike(
                `https://around-api.pt-br.tripleten-services.com/v1/cards/${item._id}/likes`,
                item
              )
              .then((updatedLike) => {
                item.isLiked = updatedLike.isLiked;
                evt.target.classList.toggle("gallery__like-button_active");
              });
          }
        );
        cardList.addItem(card.generateCard());
        console.log(item);
      });
  }
);
popupWithFormAddCard.setEventListeners();

const addCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");

addCardButton.addEventListener("click", () => {
  popupWithFormAddCard.open();
});

editProfileButton.addEventListener("click", () => {
  popupWithFormEditProfile.open(userInfo.getUserInfo());
});
