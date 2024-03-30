import "./pages/index.css";
import { cardCreate, deleteCard, likeCard } from "./scripts/card.js";
import { initialCards } from "./scripts/cards.js";
import { openModal, closePopupByOverlay } from "./scripts/modal.js";
import {
  handleFormSubmitEdit,
  handleFormSubmitNew,
  nameInput,
  jobInput,
  formElementEdit,
  formElementNew,
} from "./scripts/form.js";

/* Переменные */
const container = document.querySelector(".content");
export const placesList = container.querySelector(".places__list");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonNew = document.querySelector(".profile__add-button");
const clickImage = document.querySelector(".card__image");
export const popupEdit = document.querySelector(".popup_type_edit");
export const popupNew = document.querySelector(".popup_type_new-card");
const popups = document.querySelectorAll(".popup");

/* Добавление карточки в код */
initialCards.forEach((item) => {
  const addElement = cardCreate(
    item.name,
    item.link,
    item.alt,
    deleteCard,
    likeCard,
    clickImg
  );
  placesList.append(addElement);
});

/* Слушатель, для открытия модального окна редактирования и настройка заполнения модального окна */
buttonEdit.addEventListener("click", () => {
  formElementEdit.elements.name.value = nameInput.textContent;
  formElementEdit.elements.description.value = jobInput.textContent;
  openModal(popupEdit);
});

/* Слушатель, для открытия модального окна добавления карточки */
buttonNew.addEventListener("click", () => {
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
