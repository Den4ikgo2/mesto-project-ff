import "./pages/index.css";
import { cardCreate, handleLikeIconClick } from "./scripts/card.js";
import { openModal, closePopupByOverlay, closeModal } from "./scripts/modal.js";
import { enableValidation, clearErrorValid } from "./scripts/validation.js";
import {
  userInfoPromise,
  cardsPromise,
  editCard,
  addCard,
  profilPatch,
} from "./scripts/Api.js";

/* Переменные */
const container = document.querySelector(".content");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonNew = document.querySelector(".profile__add-button");
const popups = document.querySelectorAll(".popup");
const profileImage = document.querySelector(".profile__image");
const profilEdit = document.querySelector(".profile__image");
const popupEdit = document.querySelector(".popup_type_edit");
const popupProfilEdit = document.querySelector(".popup_profil_edit");
const popupNew = document.querySelector(".popup_type_new-card");
const placesList = container.querySelector(".places__list");
const nameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__description");
const formElementEdit = document.querySelector(".popup__form_edit");
const formElementNew = document.querySelector(".popup__form_new");
const formElementProfil = document.querySelector(".popup__form_profil");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: ".popup__input-error",
  errorActiveClass: "popup__input-error_active",
};

/* Слушатель, для открытия модального окна редактирования и настройка заполнения модального окна */
buttonEdit.addEventListener("click", () => {
  formElementEdit.elements.name.value = nameInput.textContent;
  formElementEdit.elements.description.value = jobInput.textContent;
  clearErrorValid(formElementEdit, validationConfig);
  openModal(popupEdit);
});

/* Слушатель, для открытия модального окна добавления карточки */
buttonNew.addEventListener("click", () => {
  clearErrorValid(formElementNew, validationConfig);
  openModal(popupNew);
});

/* Слушатель для открытия модального окна редактировать профиль */
profilEdit.addEventListener("click", () => {
  clearErrorValid(formElementProfil, validationConfig);
  openModal(popupProfilEdit);
});

/* Метод для открытия модального окна, при клике на изображение */
export function clickImage(event) {
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

/* Сохранение отредактированых полей модального окна редактирования, также добавил работу с API */
formElementEdit.addEventListener("submit", handleFormSubmitEdit);
/* Сохранение карточки модального окна и добавление новой карточки на страницу новая карточка */
formElementNew.addEventListener("submit", handleFormSubmitNew);
/* Сохранение профиля модального окна и добавление новой карточки на страницу новая карточка */
formElementProfil.addEventListener("submit", handleFormSubmitProfil);

enableValidation(validationConfig);

/* Подключение к серверу */
/* Выполнение обещаний после прогрузки необходимой информации с APi. Загрузка на страницу информацию обо мне и погрузка карточек с сервера */
Promise.all([userInfoPromise(), cardsPromise()])
  .then(([userData, cardData]) => {
    /* Отображение моего имени и моей работы */
    nameInput.textContent = userData.name;
    jobInput.textContent = userData.about;
    profileImage.setAttribute(
      "style",
      `background-image: url('${userData.avatar}')`
    );

    /* Выгрузка всех карточек с сервера */
    cardData.forEach((item) => {
      const addElement = cardCreate(
        item.name,
        item.link,
        item.name,
        item.likes,
        handleLikeIconClick,
        clickImage,
        item._id,
        userData._id,
        item.owner._id
      );
      placesList.append(addElement);
    });
  })
  /* В случае ошибки выводится окно об ошибке */
  .catch((err) => {
    console.log("Error fetching user and cards data: ", err);
  });

/* Функция для "лоадера" */
export function LoadElement(popupLoad, isLoad) {
  let textLoad = popupLoad.querySelector(".popup__button");
  console.log("1");
  if (isLoad) {
    textLoad.textContent = "Сохранение...";
    console.log("2");
  } else {
    textLoad.textContent = "Сохранить";
    console.log("3");
  }
}

/* Работа модального окна "Редактировать", после нажатия кнопки сохарнить также идет обращение к API */
function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  LoadElement(popupEdit, true);

  editCard(
    formElementEdit.elements.name.value,
    formElementEdit.elements.description.value
  )
    .then((res) => {
      console.log(res);
      nameInput.textContent = formElementEdit.elements.name.value;
      jobInput.textContent = formElementEdit.elements.description.value;
      closeModal(popupEdit);
      formElementEdit
        .querySelector(".popup__button")
        .classList.add("popup__button_inactive");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      LoadElement(popupEdit, false);
    });
}

/* Работа модального окна "Новая карточка", после нажатия кнопки сохарнить */
function handleFormSubmitNew(evt) {
  evt.preventDefault();
  LoadElement(popupNew, true);

  addCard(
    formElementNew.elements.place_name.value,
    formElementNew.elements.link.value
  )
    .then((card) => {
      placesList.prepend(
        cardCreate(
          formElementNew.elements.place_name.value,
          formElementNew.elements.link.value,
          formElementNew.elements.place_name.value,
          card.likes,
          /* deleteCard, */
          handleLikeIconClick,
          clickImage,
          card._id,
          card.owner._id,
          card.owner._id
        )
      );
      formElementNew.reset();
      closeModal(popupNew);
      formElementNew
        .querySelector(".popup__button")
        .classList.add("popup__button_inactive");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      LoadElement(popupNew, false);
    });
}

/* Функция для изменения информации о пользователе (также обноваляется на сервере) */
function handleFormSubmitProfil(evt) {
  evt.preventDefault();
  LoadElement(popupProfilEdit, true);
  profilPatch(formElementProfil.elements.avatar.value)
    .then(() => {
      console.log(formElementProfil.elements.avatar.value);
      profileImage.setAttribute(
        "style",
        `background-image: url("${formElementProfil.elements.avatar.value}")`
      );
      closeModal(popupProfilEdit);
      formElementProfil
        .querySelector(".popup__button")
        .classList.add("popup__button_inactive");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      LoadElement(popupProfilEdit, false);
    });
}
