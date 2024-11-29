function createCard(cardData, toggleLikeCard, zoomImageAction) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const imageCard = card.querySelector('.card__image');
  const buttonDelete = card.querySelector('.card__delete-button');
  const likeCards = card.querySelector('.card__like-button');
  const likeCounter = card.querySelector('.card__like-counter');
  const userid = '425d2e6950bbebfd9aae3ff3';
  card.querySelector('.card__title').textContent = cardData.name;
  imageCard.src = cardData.link;
  imageCard.alt = cardData.name;
  likeCounter.textContent = cardData.likes.length;
  if (cardData.owner._id !== userid) {
    buttonDelete.style.display = 'none';
  } else {
    //buttonDelete.addEventListener('click', () => handleDeleteCard(card));
  }
  likeCards.addEventListener('click', () => toggleLikeCard(likeCards));
  imageCard.addEventListener('click', () => zoomImageAction(card));
  return card;
};

function handleDeleteCard(сard) {
  сard.remove();
};

function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
};

export { createCard, handleDeleteCard, likeCard };