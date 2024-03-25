export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      modal.classList.remove("popup_is-opened");
    }
  });
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      modal.classList.remove("popup_is-opened");
    }
  });
}