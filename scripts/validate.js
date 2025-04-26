const showError = (form, input, errorMessage) => {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.add("popup__input_type_error");
  inputError.textContent = errorMessage;
  inputError.classList.add("popup__input-error_active");

  form.parentElement.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close-button")) {
      hideError(form, input);
    }
  });
};

const hideError = (form, input) => {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.remove("popup__input_type_error");
  inputError.textContent = "";
  inputError.classList.remove("popup__input-error_active");
};

const isValid = (form, input) => {
  if (!input.validity.valid) {
    showError(form, input, input.validationMessage);
  } else {
    hideError(form, input);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, button) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add("popup__submit-button_inactive");
    button.setAttribute("disabled", "");
  } else {
    button.classList.remove("popup__submit-button_inactive");
    button.removeAttribute("disabled", "");
  }
};

const setInputEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(".popup__input"));
  const button = form.querySelector(".popup__submit-button");
  toggleButtonState(inputList, button);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(form, input);
      toggleButtonState(inputList, button);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setInputEventListeners(form);
  });
};

enableValidation();
