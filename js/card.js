const offerTypeCaption = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
};


const setCardElementText = (cardElement, className, text) => {
  const cardRow = cardElement.querySelector(className);
  if (text === null || text.length === 0) {
    cardRow.classList.add('hidden');
  } else {
    cardRow.textContent = text;
  }
};


const setPhotosElement = (photoadsList, container) => {
  if (photoadsList.length > 0) {
    const photoTemplate = document.querySelector('#lodging-photo')
      .content
      .querySelector('.popup__photo');

    photoadsList.forEach(photoUrl => {
      if (photoUrl.length > 0) {
        const photoElement = photoTemplate.cloneNode(true);
        photoElement.src = photoUrl;
        container.appendChild(photoElement);
      }
    })
  } else {
    container.classList.add('hidden');
  }
};


const getCardTemplate = (adsItem) => {
  const cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');

  const cardElement = cardTemplate.cloneNode(true);

  setCardElementText(cardElement, '.popup__title', adsItem.offer.title);
  setCardElementText(cardElement, '.popup__text--address', adsItem.offer.address);
  setCardElementText(cardElement, '.popup__text--price', adsItem.offer.price + ' ₽/ночь');
  setCardElementText(cardElement, '.popup__type', offerTypeCaption[adsItem.offer.type]);
  setCardElementText(cardElement, '.popup__text--capacity', adsItem.offer.rooms + ' комнаты для ' + adsItem.offer.guests + ' гостей');
  setCardElementText(cardElement, '.popup__text--time', 'Заезд после ' + adsItem.offer.checkin + ', выезд до ' + adsItem.offer.checkout);
  setCardElementText(cardElement, '.popup__features', adsItem.offer.features.join(', '));
  setCardElementText(cardElement, '.popup__description', adsItem.offer.description);

  const photosContainer = cardElement.querySelector('.popup__photos');

  setPhotosElement(adsItem.offer.photos, photosContainer);

  cardElement.querySelector('.popup__avatar').src = adsItem.author.avatar;

  return cardElement;
};


export {getCardTemplate};
