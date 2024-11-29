const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-26',
    headers: {
      authorization: '299e752b-1c37-440e-aa7a-4185748db539',
      'Content-Type': 'application/json',
    }
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => checkResponse(res)); 
};

function userInfo() {
  return fetch (`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers,
  })
    .then(res => checkResponse(res)); 
};

function updateUserInfo(data) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
    .then(res => checkResponse(res)); 
};

function addCard(data) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  })
    .then(res => checkResponse(res))
};

function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => checkResponse(res)); 
};

function putLikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(res => checkResponse(res)); 
};

function deleteLikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => checkResponse(res)); 
};
export { getCards, userInfo, updateUserInfo, addCard, deleteCard, putLikeCard, deleteLikeCard };