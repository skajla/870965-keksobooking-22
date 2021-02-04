'use strict'

// Функция взята отсюда
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// добавлено условие

const getRandomIntNumber = function getRandomIntInclusive(min, max) {

  if (min >= 0 && min < max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    alert('Введите корректные числа');
  }
};

getRandomIntNumber(1, 5);

// Немного модифицировала предыдущую функцию
const getRandomFloatNumber = function getRandomFloatInclusive(min, max, decimalPlaces) {

  if (min >= 0 && min < max && decimalPlaces >= 0) {
    let randomResult = (Math.random() * (max - min + 1)) + min;
    let multiplier = Math.pow(10, decimalPlaces);
    return Math.ceil(randomResult * multiplier) / multiplier;
  } else {
    alert('Введите корректные числа');
  }
};

getRandomFloatNumber(3.1, -7.5, 6);
