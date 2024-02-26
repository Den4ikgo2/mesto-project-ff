// @todo: DOM узлы
const container = document.querySelector(".content");
const placesList = container.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

/* Функция на добавление карточки */
const cardCreate = function (cardAdd, cardDel) {
  cardAdd.forEach(function (element) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    cardElement.querySelector(".card__image").src = element.link;
    cardElement.querySelector(".card__title").textContent = element.name;

    placesList.append(cardElement);

    cardDel();
  });
};

/* Колбэк для функции на добавление карточки */
function cardDelete() {
  document.querySelector(".places__list").onclick = function (click) {
    if (click.target.className != "card__delete-button") return;
    let item = click.target.closest(".card");
    item.remove();
  };
}

/* Добавление карточки */
cardCreate(initialCards, cardDelete);
