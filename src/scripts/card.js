import { onHandleDeleteCard } from '../index.js';

function createCard(cardData, toggleLikeCard, zoomImageAction, currentUserId) {
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
    deleteButton.addEventListener('click', () => onHandleDeleteCard(cardData._id, card));
  }
  
  likeButton.addEventListener('click', () => toggleLikeCard(cardData, likeButton, likeCounter));
  imageCard.addEventListener('click', () => zoomImageAction(card));
  return card;
};

export { createCard };