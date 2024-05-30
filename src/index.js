import "./pages/index.css";
import {
  cardCreate,
  deleteCardfromDOM,
  handleLikeIconClick,
} from "./scripts/card.js";
import { openModal, closePopupByOverlay } from "./scripts/modal.js";
import {
  handleFormSubmitEdit,
  handleFormSubmitNew,
  nameInput,
  jobInput,
  formElementEdit,
  formElementNew,
  handleFormSubmitProfil,
  formElementProfil,
} from "./scripts/form.js";
import { enableValidation, clearErrorValid } from "./scripts/validation.js";
import {
  userInfoPromise,
  cardsPromise,
  destructionCard,
} from "./scripts/Api.js";

/* Переменные */
const container = document.querySelector(".content");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonNew = document.querySelector(".profile__add-button");
const popups = document.querySelectorAll(".popup");
const profileImage = document.querySelector(".profile__image");
const profilEdit = document.querySelector(".profile__image");
export const popupEdit = document.querySelector(".popup_type_edit");
export const popupProfilEdit = document.querySelector(".popup_profil_edit");
export const popupNew = document.querySelector(".popup_type_new-card");
export const placesList = container.querySelector(".places__list");

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

/* Слушатель для открытия модального окна редактировать профиль */
profilEdit.addEventListener("click", () => {
  clearErrorValid(formElementProfil);
  openModal(popupProfilEdit);
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

/* Сохранение отредактированых полей модального окна редактирования, также добавил работу с API */
formElementEdit.addEventListener("submit", handleFormSubmitEdit);
/* Сохранение карточки модального окна и добавление новой карточки на страницу новая карточка */
formElementNew.addEventListener("submit", handleFormSubmitNew);
/* Сохранение профиля модального окна и добавление новой карточки на страницу новая карточка */
formElementProfil.addEventListener("submit", handleFormSubmitProfil);

enableValidation();

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
      const cardIsMine = userData._id !== item.owner._id;
      const cardMeLike = userData._id === likeMeCard(item.likes, userData._id);
      const addElement = cardCreate(
        item.name,
        item.link,
        item.alt,
        item.likes,
        () => {
          destructionCard(item._id).then(() => {
            deleteCardfromDOM(addElement);
          });
        },
        handleLikeIconClick,
        clickImg,
        cardIsMine,
        cardMeLike,
        item._id
      );
      placesList.append(addElement);
    });
  })
  /* В случае ошибки выводится окно об ошибке */
  .catch((err) => {
    console.log("Error fetching user and cards data: ", err);
  });

/* Функция для подгрузки лайкнутых мною карточек */
export function likeMeCard(items, userId) {
  let cardMeLike;
  items.some((likeId) => {
    if (likeId._id === userId) {
      return (cardMeLike = userId);
    } else {
      cardMeLike = likeId._id;
    }
  });
  return cardMeLike;
}

/* Функция для "лоадера" */
export function LoadElement(popupLoad, isLoad) {
  let textLoad = popupLoad.querySelector(".popup__button");
  console.log("1")
  if (isLoad) {
    textLoad.textContent = "Сохранение...";
    console.log("2")
  } else {
    textLoad.textContent = "Сохранить";
    console.log("3")
  }
}
