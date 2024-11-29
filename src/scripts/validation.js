/*const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector('.popup__input-error');
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };
  
  const hideInputError = (formElement, inputElement, errorClass, inputErrorClass) => {
    const errorElement = formElement.querySelector('.popup__input-error');
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement, errorClass, inputErrorClass) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, errorClass, inputErrorClass);
    } else {
      hideInputError(formElement, inputElement, errorClass, inputErrorClass);
    }
  };
  
/*  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  const hasInvalidInput = (inputList) => {
    const pattern = /^[a-zA-Zа-яА-Я\s\-]+$/;
    return inputList.some((inputElement) => {
      return !pattern.test(inputElement.value);
    });
  };
  
  const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };
  
  const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, config.inputErrorClass);
        toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
      });
    });
  };

  const setEventListeners = (formElement, inputSelector, errorClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, errorClass);
      });
    });
  };
  
  const enableValidation = ({ formElement, inputElement, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
    const formList = Array.from(document.querySelectorAll(formElement));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      const fieldsetList = Array.from(formElement.querySelectorAll('.popup__form'));
      fieldsetList.forEach((fieldset) => {
        setEventListeners(fieldset, { inputElement, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass });
      });
    });
  };*/

//export { enableValidation };
const formElement = document.querySelector('.popup__form');
const inputElement = formElement.querySelector('.popup__input');
const showError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);;
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);;
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, errorMessage) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
} else {
    inputElement.setCustomValidity("");
}
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputElement, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputElement)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

function setEventListeners(formElement, inputElement, inputSelector, submitButtonSelector) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (formElement, formSelector) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
    toggleButtonState(inputElement, buttonElement, inactiveButtonClass/*Array.from(formElement.querySelectorAll('.popup__input')), formElement.querySelector('.popup__button'), 'popup__button_disabled'*/);
      });
};

const validationSettings = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  inputList: Array.from(formElement.querySelectorAll('.popup__input')),
  buttonElement: formElement.querySelector('.popup__button'),
};

const clearValidation = (inputElement, buttonElement, validationSettings) => {
  inputElement.setCustomValidity('');
  buttonElement.disabled = true;
  buttonElement.classList.add('popup__button_disabled');
};



export { enableValidation, clearValidation, validationSettings };