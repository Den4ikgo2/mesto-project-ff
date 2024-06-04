/* Функция выведение ошибки */
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorActiveClass);
  if (inputElement.validity.patternMismatch) {
    errorElement.textContent =
      inputElement.dataset.errorMessage;
  } else {
    errorElement.textContent = errorMessage;
  }
};

/* Функция скрытия ошибки */
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorActiveClass);
  errorElement.textContent = "";
};

/* Функция проверки, есть ли ошибка */
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

/* Функция установки значения валидности для кнопки и текста формы */
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

/* Функция отмены стандартной валидации браузер для форм */
export function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
}

/* Функция проверки валидности формы */
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

/* Функция активации/деактивации кнопки "сохранить в форме" */
function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

/* Функция очистки поля валидации */
export function clearErrorValid(form, validationConfig) {
  const spanErrors = Array.from(
    document.querySelectorAll(validationConfig.errorClass)
  );

  spanErrors.forEach((spanError) => {
    spanError.textContent = "";
    spanError.classList.remove(validationConfig.errorActiveClass);
    if (
      form
        .querySelector(validationConfig.inputSelector)
        .classList.contains(validationConfig.inputErrorClass)
    ) {
      form
        .querySelector(validationConfig.inputSelector)
        .classList.remove(validationConfig.inputErrorClass);
    }
  });
}
