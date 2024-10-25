const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, likeCardАction, zoomImageAction) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const imageCard = card.querySelector('.card__image');
  const buttonDelete = card.querySelector('.card__delete-button');
  const likeCards = card.querySelector('.card__like-button');
  card.querySelector('.card__title').textContent = cardData.name;
  imageCard.src = cardData.link;
  imageCard.alt = "Фотография";
  buttonDelete.addEventListener('click', () => deleteCard(card));
  likeCards.addEventListener('click', () => likeCardАction(card));
  imageCard.addEventListener('click', () => zoomImageAction(card));
  return card;
};

function deleteCard(сard) {
  сard.remove();
};

function likeCard(card) {
  const isLiked = card.querySelector('.card__like-button');
  isLiked.classList.toggle('card__like-button_is-active');
};

export { initialCards, createCard, deleteCard, likeCard };