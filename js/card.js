import {objectsList} from './data.js';


const offerTypeCaption = (offerType) => {
  switch (offerType) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    default:
      return null;
  }
};


const setCardElementText = (cardElement, className, text) => {
  const cardRow = cardElement.querySelector(className);
  cardRow.textContent = text;
  if (text == null || text.length == 0) {
    cardRow.classList.add('hidden');
  }
}


const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');


const cardsNodesList = new Array();

objectsList.forEach(({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);

  setCardElementText(cardElement, '.popup__title', offer.title);
  setCardElementText(cardElement, '.popup__text--address', offer.address);
  setCardElementText(cardElement, '.popup__text--price', offer.price + ' ₽/ночь');
  setCardElementText(cardElement, '.popup__type', offerTypeCaption(offer.type));
  setCardElementText(cardElement, '.popup__text--capacity', offer.rooms + ' комнаты для ' + offer.guests + ' гостей');
  setCardElementText(cardElement, '.popup__text--time', 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout);
  setCardElementText(cardElement, '.popup__features', offer.features.join(', '));
  setCardElementText(cardElement, '.popup__description', offer.description);

  // не смогла придумать, как добавить все три фотографии, только первую вывела
  cardElement.querySelector('.popup__photo').src = offer.photos[0];

  cardElement.querySelector('.popup__avatar').src = author.avatar;

  cardsNodesList.push(cardElement);
});


const similarCardsListFragment = document.createDocumentFragment();

similarCardsListFragment.appendChild(cardsNodesList[0])


const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.appendChild(similarCardsListFragment);
