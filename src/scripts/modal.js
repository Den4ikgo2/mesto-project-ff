/* Открытие модального окна */
export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
}

/* Закрытие модального окна */
export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

/* Закртие модального окна при нажатии на оверлэй или крестик */
export function closePopupByOverlay(evt) {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModal(evt.currentTarget);
  }
}

/* Закрытие попапа при нажатии клавиши ESC */
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}
