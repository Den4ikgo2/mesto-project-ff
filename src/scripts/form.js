export const nameInput = document.querySelector(".profile__title");
export const jobInput = document.querySelector(".profile__description");
export const formElementEdit = document.querySelector(".popup__form_edit");
export const formElementNew = document.querySelector(".popup__form_new");

import { placesList, popupNew, popupEdit, clickImg } from "../index.js";
import { cardCreate, deleteCard, likeCard } from "./card.js";
import { closeModal } from "./modal.js";

/* Работа модального окна "Редактировать", после нажатия кнопки сохарнить */
export function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  nameInput.textContent = formElementEdit.elements.name.value;
  jobInput.textContent = formElementEdit.elements.description.value;
  closeModal(popupEdit);
}

/* Работа модального окна "Новая карточка", после нажатия кнопки сохарнить */
export function handleFormSubmitNew(evt) {
  evt.preventDefault();
  placesList.prepend(
    cardCreate(
      formElementNew.elements.place_name.value,
      formElementNew.elements.link.value,
      formElementNew.elements.place_name.value,
      deleteCard,
      likeCard,
      clickImg
    )
  );
  formElementNew.reset();
  closeModal(popupNew);
}
