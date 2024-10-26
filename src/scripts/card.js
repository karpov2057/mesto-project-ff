function createCard(cardData, likeCardАction, zoomImageAction) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const imageCard = card.querySelector('.card__image');
  const buttonDelete = card.querySelector('.card__delete-button');
  const likeCards = card.querySelector('.card__like-button');
  card.querySelector('.card__title').textContent = cardData.name;
  imageCard.src = cardData.link;
  imageCard.alt = cardData.name;
  buttonDelete.addEventListener('click', () => deleteCard(card));
  likeCards.addEventListener('click', () => likeCardАction(likeCards));
  imageCard.addEventListener('click', () => zoomImageAction(card));
  return card;
};

function deleteCard(сard) {
  сard.remove();
};

function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
};

export { createCard, deleteCard, likeCard };