// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(initialCards) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const imageCard = card.querySelector('.card__image');
  const buttonDelete = card.querySelector('.card__delete-button');
  card.querySelector('.card__title').textContent = initialCards.name;
  imageCard.src = initialCards.link;
  imageCard.alt = "Фотография";
  buttonDelete.addEventListener('click', () => deleteCard(card));
  return card;
};
 
// @todo: Функция удаления карточки
function deleteCard(сard) {
   сard.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
  const newCard = createCard(card);
  cardsContainer.append(newCard);
});