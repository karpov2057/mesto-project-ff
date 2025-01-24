const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-30',
    headers: {
      authorization: '141478d8-1ab9-4959-9724-8d05972b2cc4',
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

function updateUserAvatar(data) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: data.avatar
    })
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
export { getCards, userInfo, updateUserInfo, updateUserAvatar, addCard, deleteCard, putLikeCard, deleteLikeCard };