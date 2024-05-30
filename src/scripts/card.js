import { sendLike, deleteLike } from "./Api.js";

/* Функция создания карточки */
export function cardCreate(
  name,
  link,
  alt,
  likeLen,
  cardDel,
  butlike,
  imgEle,
  cardIsMine,
  cardMeLike,
  cardID
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const buttonLike = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  let LikesCount = cardElement.querySelector(".card__like_lenght");

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").alt = alt;

  /* Подсчёт лайков для отображения количества */
  LikesCount.textContent = Array.from(likeLen).length;

  /* Опредление моя ли карточка, добавление/удаление кнопки удалить */
  if (cardIsMine) {
    buttonDelete.remove();
  } else {
    buttonDelete.addEventListener("click", cardDel);
  }

  /* закрашивание/осветление кнопки лайков при проверке лайкал ли я раньше 
  карточку (до перезагрузки страницы) смотреть index.js*/
  if (cardMeLike) {
    buttonLike.classList.toggle("card__like-button_is-active");
  }

  /* Добавление слушателя на кнопку лайка */
  buttonLike.addEventListener("click", () => {
    butlike(cardID, buttonLike, LikesCount);
  });

  /* Добавление слушателя при нажатии на картинку */
  cardImage.addEventListener("click", imgEle);

  return cardElement;
}

/* Функция для удаления карточки из массива DOM */
export function deleteCardfromDOM(card) {
  card.remove();
}

/* export function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}
 */

/* Функция для удаления карточки */
export function deleteCard(event) {
  const deleteItem = event.target.closest(".card");
  deleteItem.remove();
}

/* Функция добавления/удаления лайка на сервере, а также закрашивание/осветление кнопки */
export const handleLikeIconClick = (cardID, likeButton, LikesCount) => {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  if (!isLiked) {
    likeButton.classList.toggle("card__like-button_is-active");
    sendLike(cardID);
    LikesCount.textContent = +LikesCount.textContent + 1;
  } else {
    likeButton.classList.toggle("card__like-button_is-active");
    deleteLike(cardID);
    LikesCount.textContent = +LikesCount.textContent - 1;
  }
};
