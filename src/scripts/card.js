/* Функция создания карточки */
export function cardCreate(name, link, alt, likeLen, cardDel, butLike, imgEle, cardIsMine) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const buttonLike = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").alt = alt;
  cardElement.querySelector(".card__like_lenght").textContent = Array.from(likeLen).length;

  if (cardIsMine) {
    buttonDelete.remove();
  } else {
    buttonDelete.addEventListener("click", cardDel);
  }
  buttonLike.addEventListener("click", butLike);
  cardImage.addEventListener("click", imgEle);

  return cardElement;
}

/* Функция удаления карточки */
/* export function deleteCard(event) {
  const deleteItem = event.target.closest(".card");
  deleteItem.remove();
} */

export function deleteCardfromDOM(card) {
  card.remove();
}

/* Функция обработчика лайка на карточке */
/* export function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
} */

export function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}