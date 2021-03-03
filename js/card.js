import {objectsList} from './data.js';


const offerTypeCaption = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
};


const setCardElementText = (cardElement, className, text) => {
  const cardRow = cardElement.querySelector(className);
  if (text == null || text.length == 0) {
    cardRow.classList.add('hidden');
  } else {
    cardRow.textContent = text;
  }
};


const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');


const cardsNodesList = new Array();

objectsList.forEach(({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);

  setCardElementText(cardElement, '.popup__title', offer.title);
  setCardElementText(cardElement, '.popup__text--address', offer.address);
  setCardElementText(cardElement, '.popup__text--price', offer.price + ' ₽/ночь');
  setCardElementText(cardElement, '.popup__type', offerTypeCaption[offer.type]);
  setCardElementText(cardElement, '.popup__text--capacity', offer.rooms + ' комнаты для ' + offer.guests + ' гостей');
  setCardElementText(cardElement, '.popup__text--time', 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout);
  setCardElementText(cardElement, '.popup__features', offer.features.join(', '));
  setCardElementText(cardElement, '.popup__description', offer.description);

  const photosContainer = cardElement.querySelector('.popup__photos');
  if (offer.photos.length > 0) {
    const photoTemplate = document.querySelector('#lodging-photo')
      .content
      .querySelector('.popup__photo');

    offer.photos.forEach(photoUrl => {
      if (photoUrl.length > 0) {
        const photoElement = photoTemplate.cloneNode(true);
        photoElement.src = photoUrl;
        photosContainer.appendChild(photoElement);
      }
    });
  } else {
    photosContainer.classList.add('hidden');
  }


  cardElement.querySelector('.popup__avatar').src = author.avatar;

  cardsNodesList.push(cardElement);
});


const similarCardsListFragment = document.createDocumentFragment();

similarCardsListFragment.appendChild(cardsNodesList[0])


export {similarCardsListFragment};
