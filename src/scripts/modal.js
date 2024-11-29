//import { clearValidation, validationSettings } from "./validation.js";

function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalEsc);
    document.addEventListener('click', closeModalOverlay);
  };

  function closeModal(popup) { 
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalEsc);
    document.removeEventListener('click', closeModalOverlay);
    //clearValidation(popup, validationSettings);
  };

  function closeModalEsc(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
      closeModal(popup);
    }
  };
  
  function closeModalOverlay(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        const popup = document.querySelector('.popup_is-opened');
      closeModal(popup);
    }
  };

  export { openModal, closeModal, closeModalEsc, closeModalOverlay };