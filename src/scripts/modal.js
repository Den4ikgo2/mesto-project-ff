import { popupTypeImage } from "../index.js";

export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

export function closePopupByOverlay(evt) {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModal(evt.currentTarget);
  }
}

export function openPopupImage(evt) {
  if (evt.target.classList.contains("card__image")) {
    openModal(popupTypeImage);
  }
}

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}
