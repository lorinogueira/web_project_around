import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

const formList = Array.from(document.querySelectorAll(".popup__form"));
const submitButton = document.querySelector(".popup__submit-button");

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
    document.querySelector("#edit-profile-button").textContent = "Salvando...";
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

const popupWithFormEditAvatar = new PopupWithForm(
  ".popup_function_edit-avatar",
  (item) => {
    document.querySelector("#avatar-button").textContent = "Salvando...";
    api
      .updateAvatar(
        "https://around-api.pt-br.tripleten-services.com/v1/users/me/avatar",
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
popupWithFormEditAvatar.setEventListeners();

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
        },
        () => {
          const popupWithConfirmation = new PopupWithConfirmation(
            ".popup_function_remove-card",
            () => {
              api
                .deleteCard(
                  `https://around-api.pt-br.tripleten-services.com/v1/cards/${item._id}`
                )
                .then(() => {
                  card.removeCard();
                });
            }
          );
          popupWithConfirmation.open(item);
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
    cardList.renderItems(cardsFromApi.reverse());
  });

const popupWithFormAddCard = new PopupWithForm(
  ".popup_function_add-card",
  (cardInfos) => {
    document.querySelector("#add-card-button").textContent = "Criando...";
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
          },
          () => {
            const popupWithConfirmation = new PopupWithConfirmation(
              ".popup_function_remove-card",
              () => {
                api
                  .deleteCard(
                    `https://around-api.pt-br.tripleten-services.com/v1/cards/${item._id}`
                  )
                  .then(() => {
                    card.removeCard();
                  });
              }
            );
            popupWithConfirmation.open(item);
          }
        );
        cardList.addItem(card.generateCard());
      });
  }
);
popupWithFormAddCard.setEventListeners();

const addCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");
const editAvatarButton = document.querySelector(".profile__avatar-button");

addCardButton.addEventListener("click", () => {
  popupWithFormAddCard.open();
});

editProfileButton.addEventListener("click", () => {
  popupWithFormEditProfile.open(userInfo.getUserInfo());
});

editAvatarButton.addEventListener("click", () => {
  popupWithFormEditAvatar.open();
});
