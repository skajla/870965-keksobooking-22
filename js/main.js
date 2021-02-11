'use strict'

// Функция взята отсюда
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// добавлено условие

const isRangeValid = (min, max) => {
  return min >= 0 && min < max;
}

const getRandomIntNumber = (min, max) => {

  if(min > max) {
    let temp = min;
    min = max;
    max = temp;
  }

  if (isRangeValid(min, max)) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return null;
  }
};

//вызову функцию, иначе линтер ругается, что переменная объявлена, но не испозуется нигде
getRandomIntNumber(10, 7);

// Немного модифицировала предыдущую функцию
const getRandomFloatNumber = (min, max, decimalPlaces) => {

  if(decimalPlaces == 0){
    return getRandomIntNumber(min, max);
  }

  if(min > max) {
    let temp = min;
    min = max;
    max = temp;
  }

  if (isRangeValid(min, max) && decimalPlaces >= 0) {
    let randomResult = (Math.random() * (max - min)) + min;
    return randomResult.toFixed(decimalPlaces);
  } else {
    return null;
  }
};

//вызову функцию, иначе линтер ругается, что переменная объявлена, но не испозуется нигде
getRandomFloatNumber(2, 7, 1);
