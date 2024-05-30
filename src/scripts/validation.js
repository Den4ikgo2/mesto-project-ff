/* Функция выведение ошибки */
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.classList.add("popup__input-error_active");
  if (inputElement.validity.patternMismatch) {
    errorElement.textContent =
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
  } else {
    errorElement.textContent = errorMessage;
  }
};

/* Функция скрытия ошибки */
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};

/* Функция проверки, есть ли ошибка */
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

/* Функция установки значения валидности для кнопки и текста формы */
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

/* Функция отмены стандартной валидации браузер для форм */
export function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

/* Функция проверки валидности формы */
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

/* Функция активации/деактивации кнопки "сохранить в форме" */
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_inactive");
  } else {
    buttonElement.classList.remove("popup__button_inactive");
  }
}

/* Функция очистки поля валидации */
export function clearErrorValid(form) {
  const spanErrors = Array.from(
    document.querySelectorAll(".popup__input-error")
  );

  spanErrors.forEach((spanError) => {
    spanError.textContent = "";
    spanError.classList.remove("popup__input-error_active");
    if (
      form
        .querySelector(".popup__input")
        .classList.contains("popup__input_type_error")
    ) {
      form
        .querySelector(".popup__input")
        .classList.remove("popup__input_type_error");
    }
  });
}
