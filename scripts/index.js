
/* Переменные */
const container = document.querySelector(".content");
const placesList = container.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

/* Функция создания карточки */
function cardCreate(name, link, alt, cardDel) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelete = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").alt = alt;

  buttonDelete.addEventListener("click", cardDel);

  return cardElement;
}

/* Функция удаления карточки */
function deleteCard(event) {
  const deleteItem = event.target.closest(".card");
  deleteItem.remove();
}

/* Добавление карточки в код */
initialCards.forEach((item) => {
  const addElement = cardCreate(item.name, item.link, item.alt, deleteCard);
  placesList.append(addElement);
});
