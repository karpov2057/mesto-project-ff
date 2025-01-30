import { createCard, toggleLikeCard, onHandleDeleteCard } from "../src/scripts/card.js";
import { closeModal, openModal, closeModalEsc, closeModalOverlay } from "../src/scripts/modal.js";
import { enableValidation, clearValidation } from "../src/scripts/validation.js";
import { getCards, userInfo, updateUserInfo, updateUserAvatar, addCard } from "../src/scripts/api.js";
import '../src/pages/index.css';

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
Promise.all([
  getCards(),
  userInfo()
])
.then(([cards, userData]) => {
  titleProfile.textContent = userData.name;
  descriptionProfile.textContent = userData.about;
  linkAvatar.src = userData.avatar;
  
  cards.forEach((card) => {
    const newCard = createCard(card, zoomImage, userData._id, onHandleDeleteCard, toggleLikeCard); 
    cardsContainer.append(newCard);
  });
})
.catch((error) => {
  console.error('Ошибка при обновлении данных:', error);
});

const popupEditProfileButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_edit');
const popupButtonClose = document.querySelectorAll('.popup__close');

const popupImage = document.querySelector('.popup_type_image');
const popupImageLink = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');
const titleProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');
const imageProfile = document.querySelector('.profile__image');
const saveProfileButton = editProfileForm.querySelector('.popup__button');

const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
const updateAvatarForm = editAvatarPopup.querySelector('.popup__form');
const inputAvatarLink = editAvatarPopup.querySelector('.popup__input_type_url');
const updateAvatarButton = editAvatarPopup.querySelector('.popup__button');
const linkAvatar = document.querySelector('.profile__image-avatar');

const popupAddNewCard = document.querySelector('.popup_type_new-card');
const addNewCardForm = popupAddNewCard.querySelector('.popup__form');
const inputNameCard = popupAddNewCard.querySelector('.popup__input_type_card-name');
const inputLinkCard = popupAddNewCard.querySelector('.popup__input_type_url');
const addNewCardButton = document.querySelector('.profile__add-button');
const saveNewCardButton = addNewCardForm.querySelector('.popup__button');

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function zoomImage(card) {
  const imageCard = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  popupImageLink.src = imageCard.src;
  popupImageCaption.textContent = cardTitle.textContent;
  popupImageLink.alt = imageCard.alt;
  openModal(popupImage);
};

function addNewCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: inputNameCard.value,
    link: inputLinkCard.value,
  };

  saveNewCardButton.textContent = 'Сохранение...';

  addCard(newCard)
    .then(() => {
      inputNameCard.value = '';
      inputLinkCard.value = '';
      closeModal(popupAddNewCard);
    })
    .catch(error => {
      console.error('Ошибка при создании карточки:', error);
    })
    .finally(() => {
      saveNewCardButton.textContent = 'Сохранить';
    });
};

function saveUserProfile() {
  const userData = {
    name: nameInput.value,
    about: jobInput.value
  };
  
  saveProfileButton.textContent = 'Сохранение...';

  updateUserInfo(userData)
    .then(updatedData => {
      titleProfile.textContent = updatedData.name; 
      descriptionProfile.textContent = updatedData.about;
      closeModal(popupProfile);
    })
    .catch(error => {
      console.error('Ошибка при обновлении данных профиля:', error);
      alert('Не удалось обновить данные профиля. Пожалуйста, попробуйте снова.');
    })
    .finally(() => {
      saveProfileButton.textContent = 'Сохранить';
    });
};

function saveUserAvatar(evt) {
  evt.preventDefault();
  const userData = {
    avatar: inputAvatarLink.value
  };
  
  updateAvatarButton.textContent = 'Сохранение...';

  updateUserAvatar(userData)
    .then(updatedData => {
      linkAvatar.src = updatedData.avatar;
      closeModal(editAvatarPopup);
    })
    .catch(error => {
      console.error('Ошибка при обновлении аватара:', error);
      alert('Не удалось обновить аватар. Пожалуйста, попробуйте снова.');
    })
    .finally(() => {
      updateAvatarButton.textContent = 'Сохранить';
    });
};

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  saveUserProfile();
};

popupEditProfileButton.addEventListener('click', function() {
  clearValidation(popupProfile, settings);
  openModal(popupProfile);
  nameInput.value = titleProfile.textContent;
  jobInput.value = descriptionProfile.textContent;
});

editProfileForm.addEventListener('submit', handleFormProfileSubmit);

imageProfile.addEventListener('click', function() {
  clearValidation(editAvatarPopup, settings);
  openModal(editAvatarPopup);
});

updateAvatarForm.addEventListener('submit', function(evt) {
  saveUserAvatar(evt);
});

addNewCardButton.addEventListener('click', function() {
  clearValidation(addNewCardForm, settings);
  openModal(popupAddNewCard)
});

addNewCardForm.addEventListener('submit', addNewCard);

popupButtonClose.forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closeModal(popup);
  });
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
