// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placeList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = function(element) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = "Фотография";
  placeList.append(cardElement);
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
};
 
// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.card').remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(createCard);
   