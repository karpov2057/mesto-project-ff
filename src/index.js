import { createCard, hanleDeleteCard, likeCard } from "../src/scripts/card.js";
import { closeModal, openModal, closeModalEsc, closeModalOverlay } from "../src/scripts/modal.js";
import { enableValidation } from "../src/scripts/validation.js";
import { getCards, userInfo, updateUserInfo, addCard, deleteCard, putLikeCard, deleteLikeCard } from "../src/scripts/api.js";
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
  imageProfile.src = userData.avatar;
  imageProfile.alt = userData.name;
  
  cards.forEach((card) => {
    const newCard = createCard(card, toggleLikeCard, zoomImage);
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

const popupAddNewCard = document.querySelector('.popup_type_new-card');
const addNewCardForm = popupAddNewCard.querySelector('.popup__form');
const inputNameCard = popupAddNewCard.querySelector('.popup__input_type_card-name');
const inputLinkCard = popupAddNewCard.querySelector('.popup__input_type_url');
const popupButtonAddCard = document.querySelector('.profile__add-button');

const cardDeleteModalWindow = document.querySelector('.popup_type_delete-card');
const buttonDelete = document.querySelector('.card__delete-button');

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
  addCard(newCard)
    .then(() => {
      inputNameCard.value = '';
      inputLinkCard.value = '';
      location.reload();
      const popup = document.querySelector('.popup_is-opened');
      closeModal(popup);
    })
    .catch(error => {
      console.error('Ошибка при создании карточки:', error);
    });
};

function saveUserProfile() {
  const userData = {
    name: nameInput.value,
    about: jobInput.value
  };
  updateUserInfo(userData)
    .then(updatedData => {
      titleProfile.textContent = updatedData.name; 
      descriptionProfile.textContent = updatedData.about;
      const popup = document.querySelector('.popup_is-opened');
      closeModal(popup);
    })
    .catch(error => {
      console.error('Ошибка при обновлении данных профиля:', error);
      alert('Не удалось обновить данные профиля. Пожалуйста, попробуйте снова.');
    });
};

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  saveUserProfile();
};

let cardForDelete = {}
const handleDeleteCard = (cardId, cardElement) => {
  cardForDelete = {
    id: cardId,
    cardElement
  }
  openModal(cardDeleteModalWindow);
};

/*function handleCardDeletion(card) {
  const cardId = card.dataset.cardId;
  deleteCardFromServer(cardId)
    .then(() => {
      removeCardFromDOM(card);
    })
    .catch(error => {
      console.error('Ошибка при удалении карточки:', error);
    });
};*/

function toggleLikeCard(card) {
  const likeButton = document.querySelector('.card__like-button');
  const cardId = card.dataset.cardId;

  if (likeButton.classList.contains('card__like-button_is-active')) {
    handleDeleteLikeCard(cardId);
  } else {
    handlePutLikeCard(cardId);
  }
}

function handlePutLikeCard(card) {
  const cardId = card.dataset.cardId;
  putLikeCard(cardId)
    .then(() => {
      likeCard(card);
    })
    .catch(error => {
      console.error('Ошибка при лайке карточки:', error);
    });
};

function handleDeleteLikeCard(card) {
  const cardId = card.dataset.cardId;
  deleteLikeCard(cardId)
    .then(() => {
      likeCard(card);
    })
    .catch(error => {
      console.error('Ошибка при удалении лайка карточки:', error);
    });
};

popupEditProfileButton.addEventListener('click', function() {
  openModal(popupProfile);
  nameInput.value = titleProfile.textContent;
  jobInput.value = descriptionProfile.textContent;
});

editProfileForm.addEventListener('submit', handleFormProfileSubmit);

popupButtonAddCard.addEventListener('click', function() {
  openModal(popupAddNewCard)
});

buttonDelete.addEventListener('click', function() {
  openModal(cardDeleteModalWindow);
});

addNewCardForm.addEventListener('submit', addNewCard);

popupButtonClose.forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closeModal(popup);
  });
});

/*enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});*/


