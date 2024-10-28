import { initialCards } from "../src/scripts/cards.js";
import { createCard, deleteCard, likeCard } from "../src/scripts/card.js";
import { closeModal, openModal, closeModalEsc, closeModalOverlay } from "../src/scripts/modal.js";
import '../src/pages/index.css';

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
  const newCard = createCard(card, likeCard, zoomImage);
  cardsContainer.append(newCard);
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

const popupAddNewCard = document.querySelector('.popup_type_new-card');
const addNewCardForm = popupAddNewCard.querySelector('.popup__form');
const inputNameCard = popupAddNewCard.querySelector('.popup__input_type_card-name');
const inputLinkCard = popupAddNewCard.querySelector('.popup__input_type_url');
const popupButtonAddCard = document.querySelector('.profile__add-button');

function zoomImage(card) {
  const imageCard = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  popupImageLink.src = imageCard.src;
  popupImageCaption.textContent = cardTitle.textContent;
  popupImageLink.alt = imageCard.alt;
  openModal(popupImage);
  document.addEventListener('keydown', closeModalEsc);
  document.addEventListener('click', closeModalOverlay);
};

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  titleProfile.textContent = nameInput.value;
  descriptionProfile.textContent = jobInput.value;
  const popup = document.querySelector('.popup_is-opened');
  closeModal(popup);
};

function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  const newCard = createCard({
    name: inputNameCard.value,
    link: inputLinkCard.value
  }, likeCard, zoomImage);
  cardsContainer.prepend(newCard);
  addNewCardForm.reset();
  const popup = document.querySelector('.popup_is-opened');
  closeModal(popup);
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

addNewCardForm.addEventListener('submit', handleFormSubmitNewCard);

popupButtonClose.forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closeModal(popup);
  });
});