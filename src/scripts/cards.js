import { openModal} from "./modal.js";

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
      alt: "Изображение великолепных гор Архыз",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
      alt: "Изображен водоем в Челябинской области",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
      alt: "Многоэтажные дома в Иваново",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
      alt: "Великолепные поля Камчатки",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
      alt: "Бескрайняя желзная дорога посреди леса Холмогорского района",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
      alt: "Скала на берегу реки Байкал",
    }
];

/* Функция создания карточки */
export function cardCreate(name, link, alt, cardDel, butLike, imgEle) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const buttonLike = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").alt = alt;

  buttonDelete.addEventListener("click", cardDel);
  buttonLike.addEventListener("click", butLike);
  cardImage.addEventListener("click", imgEle);

  return cardElement;
}

/* Функция удаления карточки */
export function deleteCard(event) {
  const deleteItem = event.target.closest(".card");
  deleteItem.remove();
}

/* Функция обработчика лайка на карточке */
export function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

/* Функция открытия увеличенной картинки */
export function clickImg(event) {
    const popup = document.querySelector(".popup_type_image")
    const popupImg = popup.querySelector(".popup__image")
    const popupText = popup.querySelector(".popup__caption")
    openModal(popup);
    popupImg.src = event.target.src;
    popupText.textContent = event.target.alt;
}