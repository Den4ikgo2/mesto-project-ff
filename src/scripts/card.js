import { sendLike, deleteLike, destructionCard } from "./Api.js";

/* Функция создания карточки */
export function cardCreate(objectCard, pushButtonlike, openImageElement) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const buttonLike = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardIsMine = objectCard.userId !== objectCard.cardOwnerId;
  const cardMeLike =
    objectCard.userId === likeMeCard(objectCard.cardLikes, objectCard.userId);
  let LikesCount = cardElement.querySelector(".card__like_lenght");

  cardElement.querySelector(".card__image").src = objectCard.cardLink;
  cardElement.querySelector(".card__title").textContent = objectCard.cardName;
  cardElement.querySelector(".card__image").alt = objectCard.cardName;

  /* Подсчёт лайков для отображения количества */
  LikesCount.textContent = Array.from(objectCard.cardLikes).length;

  /* Опредление моя ли карточка, добавление/удаление кнопки удалить */
  if (cardIsMine) {
    buttonDelete.remove();
  } else {
    buttonDelete.addEventListener("click", () => {
      deleteCardfromDomAndApi(objectCard.cardId, cardElement);
    });
  }

  /* закрашивание/осветление кнопки лайков при проверке лайкал ли я раньше 
  карточку (до перезагрузки страницы) смотреть index.js*/
  if (cardMeLike) {
    buttonLike.classList.toggle("card__like-button_is-active");
  }

  /* Добавление слушателя на кнопку лайка */
  buttonLike.addEventListener("click", () => {
    pushButtonlike(objectCard.cardId, buttonLike, LikesCount);
  });

  /* Добавление слушателя при нажатии на картинку */
  cardImage.addEventListener("click", openImageElement);

  return cardElement;
}

/* Функция для удаления карточки из массива DOM */
export function deleteCardfromDOM(card) {
  card.remove();
}

/* Функция добавления/удаления лайка на сервере, а также закрашивание/осветление кнопки */
export const handleLikeIconClick = (cardId, likeButton, LikesCount) => {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  if (!isLiked) {
    sendLike(cardId)
      .then(() => {
        likeButton.classList.toggle("card__like-button_is-active");
        LikesCount.textContent = +LikesCount.textContent + 1;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    deleteLike(cardId)
      .then(() => {
        likeButton.classList.toggle("card__like-button_is-active");
        LikesCount.textContent = +LikesCount.textContent - 1;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

/* Функция для подгрузки лайкнутых мною карточек */
function likeMeCard(items, userId) {
  let cardMeLike;
  const itemsArray = Array.from(items);
  itemsArray.some((likeId) => {
    if (likeId._id === userId) {
      return (cardMeLike = userId);
    } else {
      cardMeLike = likeId._id;
    }
  });
  return cardMeLike;
}

/* Функция полного удаления карточки с Api и верстки */
function deleteCardfromDomAndApi(cardId, element) {
  destructionCard(cardId)
    .then(() => {
      return deleteCardfromDOM(element);
    })
    .catch((err) => {
      console.log(err);
    });
}
