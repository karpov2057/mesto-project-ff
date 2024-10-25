const popups = document.querySelectorAll('.popup');

function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalEsc);
    document.addEventListener('click', closeModalOverlay);
  };

  function closeModal() {
    for (let i = 0; i < popups.length; i++) {
    const popup = popups[i];
    if (popup.classList.contains('popup_is-opened')) {
    popup.classList.remove('popup_is-opened');
    } 
  } document.removeEventListener('keydown', closeModalEsc);
  };

  function closeModalEsc(evt) {
    if (evt.key === 'Escape') {
      closeModal();
    }
  };
  
  function closeModalOverlay(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
      closeModal();
    }
  };

  export { openModal, closeModal, closeModalEsc, closeModalOverlay };