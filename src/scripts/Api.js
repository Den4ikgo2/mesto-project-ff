
/* Мои линчый ключ для выполнение разлчиных действий с API */
export const token = "1bdefa6c-18f0-44a1-946b-12adfd109851";

/* Повторяющийся конфиг */
const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-14/",
    headers: {
        authorization: token,
        "Content-Type": "application/json"
    }
}

/* Функция для получения информации обо мне с сервера */
export function userInfoPromise() {
    return fetch(`${config.baseUrl}users/me`, {
        headers: config.headers,
    })
    .then((res) => {
        if(res.ok){
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

  /* Функция для получения списка карточек */
  export function cardsPromise() {
    return fetch(`${config.baseUrl}cards`, {
      headers: config.headers,
    })
    .then((res) => {
        if(res.ok){
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
    .catch((err) => {
        console.log(err);
    })    
  }

/* Функция на изменение профиля */
export function editCard(nameInput, jobInput) {
    fetch(`${config.baseUrl}users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        name: nameInput.textContent,
        about: jobInput.textContent,
      }),
    })
    /* .then((res) => {
        if(res.ok){
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }) */
    .catch((err) => {
        console.log(err);
    })
  }

/* Функция добавления карточки */
export function addCard(name_value, link_value) {
    return fetch(`${config.baseUrl}cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name: name_value,
        link: link_value,
      }),
    })
    .then((res) => {
        if(res.ok){
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
    .catch((err) => {
        console.log(err);
    })
  }
  
/* Функция удаления карточки */  
export function destructionCard(id) {
    return fetch(`${config.baseUrl}cards/${id}`, {
      method: "DELETE",
      headers: config.headers,
    })
    .then((res) => {
        if(res.ok){
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
    .catch((err) => {
        console.log(err);
    })
  }

/* Функция для отправки в массив лайка */
export function sendLike(id) {
    return fetch(`${config.baseUrl}cards/likes/${id}`, {
      method: "PUT",
      headers: config.headers,
    })
    .then((res) => {
        if(res.ok){
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
    .catch((err) => {
        console.log(err);
    })
  }

/* Функция для удаление с массива карточки лайка (на сервере) */
export function deleteLike(id) {
    return fetch(`${config.baseUrl}cards/likes/${id}`, {
      method: "DELETE",
      headers: config.headers,
    })
    .then((res) => {
        if(res.pk){
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
    .catch((err) => {
        console.log(err);
    })
  }

  /* Функция обновления аватарки пользователя */
  export function profilPatch(link) {
    fetch(`${config.baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    })
    .then((res) => {
        if(res.ok){
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
    .catch((err) => {
        console.log(err);
    })
  }