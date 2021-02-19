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

getRandomIntNumber(10, 7);


const getRandomFloatNumber = (min, max, decimalPlaces) => {
  if(decimalPlaces == 0){
    return getRandomIntNumber(min, max);
  }

  if(min > max) {
    let temp = min;
    min = max;
    max = temp;
  }

  if (isRangeValid(min, max) && decimalPlaces > 0) {
    let randomResult = (Math.random() * (max - min)) + min;
    return randomResult.toFixed(decimalPlaces);
  } else {
    return null;
  }
};

getRandomFloatNumber(2, 7, 1);


export {getRandomIntNumber, getRandomFloatNumber};
