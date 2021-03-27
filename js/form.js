import {setFormDisabled, setFormEnabled} from './util.js';
import {postBookingData} from './network.js';


const minPricePerNight = {
  'flat': 1000,
  'bungalow': 0,
  'house': 5000,
  'palace': 10000,
};

const adForm = document.querySelector('.ad-form');
const pricePerNight = adForm.querySelector('#price');
const typeSelector = adForm.querySelector('#type');

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  prepareAndSendForm(evt.target);
});

const prepareAndSendForm = (form) => {
  postBookingData(new FormData(form))
    .then(() => {
      form.reset();
      showFormSentSuccessMessage();
    }).catch (() => {
      showFormSendingFailedMessage();
    });
};

const showFormSentSuccessMessage = () => {
  let messageBlock = document.querySelector('#success').content.cloneNode(true);
  let mainContatiner = document.querySelector('main');

  messageBlock.firstElementChild.onclick = () => {
    mainContatiner.removeChild(mainContatiner.querySelector('.success'));
  }
  mainContatiner.appendChild(messageBlock);
};

const showFormSendingFailedMessage = () => {
  let messageBlock = document.querySelector('#error').content.cloneNode(true);
  let mainContatiner = document.querySelector('main');

  messageBlock.firstElementChild.onclick = () => {
    mainContatiner.removeChild(mainContatiner.querySelector('.error'));
  }
  mainContatiner.appendChild(messageBlock);
};

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
  if(isEnabled) {
    setFormEnabled(adForm , 'ad-form--disabled');
  }else {
    setFormDisabled(adForm, 'ad-form--disabled');
  }
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
