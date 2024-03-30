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
