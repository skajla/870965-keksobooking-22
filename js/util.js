const isRangeValid = (min, max) => {
  return min >= 0 && min < max;
};


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


const getFormControls = (form) => {
  return Array.from(form.getElementsByTagName('fieldset'))
    .concat(Array.from(form.getElementsByTagName('select')));
};


const setFormEnabled = (form, disabledFormClass) => {
  form.classList.remove(disabledFormClass);
  let fieldset = getFormControls(form);
  for (let item of fieldset) {
    item.removeAttribute('disabled');
  }
};

const setFormDisabled = (form, disabledFormClass) => {
  form.classList.add(disabledFormClass);
  let fieldset = getFormControls(form);
  for (let item of fieldset) {
    item.setAttribute('disabled', true);
  }
};


export {getRandomIntNumber, getRandomFloatNumber, setFormDisabled, setFormEnabled};
