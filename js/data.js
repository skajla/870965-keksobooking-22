import {getRandomFloatNumber} from './util.js';
import {getRandomIntNumber} from './util.js';


const TITLES = [
  'Title 1',
  'Title 2',
  'Title 3',
  'Title 4',
  'Title 5',
]

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
]

const CHECKIN_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
]

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
]

const DESCRIPTIONS = [
  'Не оч',
  'Ну такое',
  'Норм',
  'Агонь',
]

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
]

const createLocation = () => {
  return {
    x: getRandomFloatNumber(35.65000, 35.70000, 5),
    y: getRandomFloatNumber(139.70000, 139.80000, 5),
  };
};

// оставлю console.log, чтобы тебе удобнее было проверять
// console.log(createLocation());


const createAuthor = () => {
  let imgNumber = getRandomIntNumber(1, 8);
  let imgNumberStr = imgNumber < 10 ? '0' + imgNumber : imgNumber;
  return {
    avatar: 'img/avatars/user' + imgNumberStr + '.png',
  };
};

// оставлю console.log, чтобы тебе удобнее было проверять
// console.log(createAuthor());


const getRandomArrayElement = (elements) => {
  return elements[getRandomIntNumber(0, elements.length - 1)];
};


const createOffer = (location) => {
  return {
    title: getRandomArrayElement(TITLES),
    address: location.x + ', ' + location.y,
    price: getRandomIntNumber(1, 1000000),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomIntNumber(1, 100),
    guests: getRandomIntNumber(1, 50),
    checkin: getRandomArrayElement(CHECKIN_CHECKOUT),
    checkout: getRandomArrayElement(CHECKIN_CHECKOUT),
    features: randomSubArray(FEATURES),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: randomSubArray(PHOTOS),
  }
}

// оставлю console.log, чтобы тебе удобнее было проверять
// console.log(createOffer(createLocation));


const randomSubArray = (array) => {
  if (array == null || array.length == 0) {
    return null;
  }

  let length = getRandomIntNumber(1, array.length);

  return new Array(length).fill(null).map(() => {
    return getRandomArrayElement(array);
  });
}

// оставлю console.log, чтобы тебе удобнее было проверять
// console.log(createOffer(createOffer));


const objectsList = new Array(10).fill(null).map(() => {
  let location = createLocation();
  return {
    author: createAuthor(),
    offer: createOffer(location),
    location: location,
  }
});

// вызову переменную, иначе линтер ругается, что переменная объявлена, но не испозуется нигде
objectsList;

