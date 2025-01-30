import { deleteCard, putLikeCard, deleteLikeCard } from "../../src/scripts/api.js";
import { openModal, closeModal } from "../scripts/modal.js";

const cardDeleteModalWindow = document.querySelector('.popup_type_delete-card');
const deleteCardPopupButton = cardDeleteModalWindow.querySelector('.popup__button');

function createCard(cardData,  zoomImageAction, currentUserId, deleteCardHandler, handleLikeCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const imageCard = card.querySelector('.card__image');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  const likeCounter = card.querySelector('.card__like-counter');
  card.querySelector('.card__title').textContent = cardData.name;
  imageCard.src = cardData.link;
  imageCard.alt = cardData.name;
  likeCounter.textContent = cardData.likes.length;
  
  if (cardData.likes.some((like) => like._id === currentUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (cardData.owner._id !== currentUserId) {
    deleteButton.style.display = 'none';
  } else {
    deleteButton.addEventListener('click', () => deleteCardHandler(cardData._id, card));
  }
  
  deleteCardPopupButton.addEventListener('click', handleDeleteCardSubmit);
  likeButton.addEventListener('click', () => handleLikeCard(cardData, likeButton, likeCounter));
  imageCard.addEventListener('click', () => zoomImageAction(card));
  return card;
};

let cardForDelete = {}
const onHandleDeleteCard = (cardId, card) => {
  cardForDelete = {
    id: cardId,
    card
  }
  openModal(cardDeleteModalWindow);  
};

const handleDeleteCardSubmit = (evt) => {
  evt.preventDefault();
  if (!cardForDelete.card) return;

  deleteCard(cardForDelete.id)
    .then(() => {
      cardForDelete.card.remove();
      closeModal(cardDeleteModalWindow);
      cardForDelete = {};
    })
    .catch((error) => {
      console.error("Не удалось удалить карточку:", error);
    })
};

function toggleLikeCard(cardData, likeButton, likeCounter) {
  const cardId = cardData._id;

  if (likeButton.classList.contains('card__like-button_is-active')) {
    handleDeleteLikeCard(cardData, likeButton, likeCounter);
  } else {
    handlePutLikeCard(cardData, likeButton, likeCounter);
  }
};

function handlePutLikeCard(cardData, likeButton, likeCounter) {
  const cardId = cardData._id;
  putLikeCard(cardId)
    .then((updatedCardData) => {
      likeButton.classList.add('card__like-button_is-active');
      likeCounter.textContent = updatedCardData.likes.length;
    })
    .catch(error => {
      console.error('Ошибка при лайке карточки:', error);
    });
};

function handleDeleteLikeCard(cardData, likeButton, likeCounter) {
  const cardId = cardData._id;
  deleteLikeCard(cardId)
    .then((updatedCardData) => {
      likeButton.classList.remove('card__like-button_is-active');
      likeCounter.textContent = updatedCardData.likes.length;
    })
    .catch(error => {
      console.error('Ошибка при удалении лайка карточки:', error);
    });
};

export { createCard, toggleLikeCard, onHandleDeleteCard, handleDeleteCardSubmit };