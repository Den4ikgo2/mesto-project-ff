/* import "./pages/index.css"; */
import {
  initialCards,
  cardCreate,
  deleteCard,
  likeCard,
  clickImg,
} from "./scripts/cards.js";
import { openModal, closeModal } from "./scripts/modal.js";
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
const popupEdit = document.querySelector(".popup_type_edit");
const popupNew = document.querySelector(".popup_type_new-card");
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

/* Перебор модальных окон, для их закрытия */
popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");

  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup__close") ||
      evt.target.classList.contains("popup_type_edit") ||
      evt.target.classList.contains("popup_type_new-card") ||
      evt.target.classList.contains("popup_type_image")
    ) {
      closeModal(popup);
    }
  });
});

/* Сохранение отредактированых полей модального окна редактирования */
formElementEdit.addEventListener("submit", handleFormSubmitEdit);
/* Сохранение карточки модального окна и добавление новой карточки на страницу новая карточка */
formElementNew.addEventListener("submit", handleFormSubmitNew);
