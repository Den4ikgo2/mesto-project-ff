/* import "./pages/index.css"; */
import { cardCreate, likeCard, deleteCardfromDOM } from "./scripts/card.js";
import { openModal, closePopupByOverlay } from "./scripts/modal.js";
import {
  handleFormSubmitEdit,
  handleFormSubmitNew,
  nameInput,
  jobInput,
  formElementEdit,
  formElementNew,
} from "./scripts/form.js";
import { enableValidation, clearErrorValid } from "./scripts/validation.js";

/* Переменные */
const container = document.querySelector(".content");
export const placesList = container.querySelector(".places__list");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonNew = document.querySelector(".profile__add-button");
const clickImage = document.querySelector(".card__image");
export const popupEdit = document.querySelector(".popup_type_edit");
export const popupNew = document.querySelector(".popup_type_new-card");
const popups = document.querySelectorAll(".popup");
const profileImage = document.querySelector(".profile__image");

/* Добавление карточки в код ПР6 */
/* initialCards.forEach((item) => {
  const addElement = cardCreate(
    item.name,
    item.link,
    item.alt,
    deleteCard,
    likeCard,
    clickImg
  );
  placesList.append(addElement);
}); */

/* Слушатель, для открытия модального окна редактирования и настройка заполнения модального окна */
buttonEdit.addEventListener("click", () => {
  formElementEdit.elements.name.value = nameInput.textContent;
  formElementEdit.elements.description.value = jobInput.textContent;
  clearErrorValid(formElementEdit);
  openModal(popupEdit);
});

/* Слушатель, для открытия модального окна добавления карточки */
buttonNew.addEventListener("click", () => {
  clearErrorValid(formElementNew);
  openModal(popupNew);
});

/* Метод для открытия модального окна, при клике на изображение */
export function clickImg(event) {
  const popup = document.querySelector(".popup_type_image");
  const popupImg = popup.querySelector(".popup__image");
  const popupText = popup.querySelector(".popup__caption");
  openModal(popup);
  popupImg.src = event.target.src;
  popupText.textContent = event.target.alt;
  popupImg.textContent = event.target.alt;
}

/* Перебор модальных окон, для их закрытия */
popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("click", closePopupByOverlay);
});

/* Сохранение отредактированых полей модального окна редактирования */
formElementEdit.addEventListener("submit", handleFormSubmitEdit);
/* Сохранение карточки модального окна и добавление новой карточки на страницу новая карточка */
formElementNew.addEventListener("submit", handleFormSubmitNew);

enableValidation();

/* Подключение к серверу */

function userInfoPromise() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-10/users/me", {
    headers: {
      authorization: "c082e286-4b55-44ba-81c5-08af7855820a",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

function cardsPromise() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-10/cards", {
    headers: {
      authorization: "c082e286-4b55-44ba-81c5-08af7855820a",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

Promise.all([userInfoPromise(), cardsPromise()])
  .then(([userData, cardData]) => {
    nameInput.textContent = userData.name;
    jobInput.textContent = userData.about;
    profileImage.setAttribute(
      "style",
      `background-image: url('${userData.avatar}')`
    );
    console.log(cardData);

    cardData.forEach((item) => {
      const cardIsMine = userData._id !== item.owner._id;
      const addElement = cardCreate(
        item.name,
        item.link,
        item.alt,
        item.likes,
        () => {
          destructionCard(item._id)
            .then(() => {
              deleteCardfromDOM(addElement);
            })
        },
        likeCard,
        clickImg,
        cardIsMine
      );
      placesList.append(addElement);
    });
  })
  .catch((err) => {
    console.log("Error fetching user and cards data: ", err);
  });

/* Изменение профиля */

function editCard() {
  fetch("https://nomoreparties.co/v1/wff-cohort-10/users/me", {
    method: "PATCH",
    headers: {
      authorization: "c082e286-4b55-44ba-81c5-08af7855820a",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput.textContent,
      about: jobInput.textContent,
    }),
  });
}
/* Добавление карточки */

function addCard() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-10/cards ", {
    method: "POST",
    headers: {
      authorization: "c082e286-4b55-44ba-81c5-08af7855820a",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Тачка",
      link: "https://widewp.ru/images/cars/4265.jpg",
    }),
  });
}

/* Удаление карточки */

function destructionCard (id) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-10/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "c082e286-4b55-44ba-81c5-08af7855820a",
      "Content-Type": "application/json",
    }
  }).then((res) => res.json());
} 

/* Лайк карточки */
function sendLike (id) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-10/cards/likes/${id}`, {
    method: "PUT",
    headers: {
      authorization: "c082e286-4b55-44ba-81c5-08af7855820a",
      "Content-Type": "application/json",
    }
  }).then((res) => res.json());
}

/* Удаление лайка карточки */
function deleteLike (id) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-10/cards/likes/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "c082e286-4b55-44ba-81c5-08af7855820a",
      "Content-Type": "application/json",
    }
  }).then((res) => res.json());
}