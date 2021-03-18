import {formControls} from './util.js';


const minPricePerNight = {
  'flat': 1000,
  'bungalow': 0,
  'house': 5000,
  'palace': 10000,
};

const adForm = document.querySelector('.ad-form');
const pricePerNight = adForm.querySelector('#price');
const typeSelector = adForm.querySelector('#type');

const onTypeChanged = () => {
  changePricePlaceholder(typeSelector.value)
};

const changePricePlaceholder = (type) => {
  const minPrice = minPricePerNight[type];
  pricePerNight.setAttribute('placeholder', minPrice);
};

changePricePlaceholder(typeSelector.value);

typeSelector.onchange = onTypeChanged;


const setNoticeFormEnabled = (isEnabled) => {
  formControls(adForm, isEnabled);
};

const roomQuantity = adForm.querySelector('#room_number');
const roomCapacity = adForm.querySelector('#capacity');

const validateRooms = () => {
  let isValid = roomQuantity.value === 100 && roomCapacity.value === 0 || roomQuantity.value != 100 && roomCapacity.value != 0 && roomQuantity.value >= roomCapacity.value;

  if(isValid) {
    roomCapacity.setCustomValidity('');
  } else {
    if(roomQuantity.value == 100) {
      roomCapacity.setCustomValidity('100 комнат только не для гостей!!!');
    } else {
      roomCapacity.setCustomValidity('Гостей много, а комнат мало!!!');
    }
  }
};

roomCapacity.onchange = () => {
  validateRooms()
};

roomQuantity.onchange = () => {
  validateRooms()
};


const checkInTime = adForm.querySelector('#timein');
const checkOutTime = adForm.querySelector('#timeout');

checkInTime.onchange = () => {
  checkOutTime.value = checkInTime.value ;
};

checkOutTime.onchange = () => {
  checkInTime.value = checkOutTime.value ;
};


export {setNoticeFormEnabled};
