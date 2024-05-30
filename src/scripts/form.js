import {
  placesList,
  popupNew,
  popupEdit,
  clickImg,
  popupProfilEdit,
  LoadElement,
} from "../index.js";
import { cardCreate, deleteCard, handleLikeIconClick } from "./card.js";
import { closeModal } from "./modal.js";
import { editCard, addCard, profilPatch } from "./Api.js";

export const nameInput = document.querySelector(".profile__title");
export const jobInput = document.querySelector(".profile__description");
export const formElementEdit = document.querySelector(".popup__form_edit");
export const formElementNew = document.querySelector(".popup__form_new");
export const formElementProfil = document.querySelector(".popup__form_profil");

/* Работа модального окна "Редактировать", после нажатия кнопки сохарнить также идет обращение к API */
export function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  LoadElement(popupEdit, true);
  nameInput.textContent = formElementEdit.elements.name.value;
  jobInput.textContent = formElementEdit.elements.description.value;
  editCard(nameInput, jobInput);
  LoadElement(popupEdit, false);
  closeModal(popupEdit);
  formElementEdit
    .querySelector(".popup__button")
    .classList.add("popup__button_inactive");
}

/* Работа модального окна "Новая карточка", после нажатия кнопки сохарнить */
export function handleFormSubmitNew(evt) {
  evt.preventDefault();
  LoadElement(popupNew, true);
  placesList.prepend(
    cardCreate(
      formElementNew.elements.place_name.value,
      formElementNew.elements.link.value,
      formElementNew.elements.place_name.value,
      "",
      deleteCard,
      handleLikeIconClick,
      clickImg
    )
  );
  addCard(
    formElementNew.elements.place_name.value,
    formElementNew.elements.link.value
  );
  formElementNew.reset();
  LoadElement(popupNew, false);
  closeModal(popupNew);
  formElementNew
    .querySelector(".popup__button")
    .classList.add("popup__button_inactive");
}

/* Функция для изменения информации о пользователе (также обноваляется на сервере) */
export function handleFormSubmitProfil(evt) {
  evt.preventDefault();
  LoadElement(popupProfilEdit, true);
  profilPatch(formElementProfil.elements.avatar.value);
  LoadElement(popupProfilEdit, false);
  closeModal(popupProfilEdit);
  formElementProfil
    .querySelector(".popup__button")
    .classList.add("popup__button_inactive");
}
