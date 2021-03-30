import {setFormDisabled, setFormEnabled, isEscEvent} from './util.js';
import {postBookingData} from './network.js';
import {resetMap} from './map.js';


const minPricePerNight = {
  'flat': 1000,
  'bungalow': 0,
  'house': 5000,
  'palace': 10000,
};


const MAX_PRICE_PER_NIGHT = 1000000;
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const adForm = document.querySelector('.ad-form');
const titleField = adForm.querySelector('#title');
const pricePerNight = adForm.querySelector('#price');
const typeSelector = adForm.querySelector('#type');
const mainContainer = document.querySelector('main');

const initFieldsByDefault = () => {
  pricePerNight.setAttribute('max', MAX_PRICE_PER_NIGHT);
  titleField.setAttribute('minlength', MIN_TITLE_LENGTH);
  titleField.setAttribute('maxlength', MAX_TITLE_LENGTH);
}

initFieldsByDefault();


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


adForm.onreset = () => {

  setTimeout(function() {
    updateMinPriceField(typeSelector.value);
  }, 100);

  resetMap();
};


const showFormSentSuccessMessage = () => {
  let messageBlock = document.querySelector('#success').content.cloneNode(true);
  messageBlock.firstElementChild.onclick = () => {
    mainContainer.removeChild(mainContainer.querySelector('.success'));
  }
  mainContainer.appendChild(messageBlock);
};


const showFormSendingFailedMessage = () => {
  let messageBlock = document.querySelector('#error').content.cloneNode(true);
  messageBlock.firstElementChild.onclick = () => {
    mainContainer.removeChild(mainContainer.querySelector('.error'));
  }
  mainContainer.appendChild(messageBlock);
};


const closeFormSentMessage = () => {
  let successOverlay = mainContainer.querySelector('.success');
  let errorOverlay = mainContainer.querySelector('.error');

  if (successOverlay) {
    mainContainer.removeChild(successOverlay);}

  if (errorOverlay) {
    mainContainer.removeChild(errorOverlay);
  }
};


const initOnEscPressedEvent = () => {
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeFormSentMessage();
    }
  });
};

initOnEscPressedEvent();


const onTypeChanged = () => {
  updateMinPriceField(typeSelector.value)
};


const updateMinPriceField = (type) => {
  const minPrice = minPricePerNight[type];
  pricePerNight.setAttribute('placeholder', minPrice);
  pricePerNight.setAttribute('min', minPrice);
};

updateMinPriceField(typeSelector.value);


typeSelector.onchange = onTypeChanged;


const setNoticeFormEnabled = (isEnabled) => {
  if(isEnabled) {
    setFormEnabled(adForm , 'ad-form--disabled');
  } else {
    setFormDisabled(adForm, 'ad-form--disabled');
  }
};


const roomQuantity = adForm.querySelector('#room_number');
const roomCapacity = adForm.querySelector('#capacity');


const validateRooms = () => {
  let roomQuantityInt = parseInt(roomQuantity.value);
  let roomCapacityInt = parseInt(roomCapacity.value);

  let isValid = roomQuantityInt === 100 && roomCapacityInt === 0 || roomQuantityInt !== 100 && roomCapacityInt !== 0 && roomQuantityInt >= roomCapacityInt;
  if(isValid) {
    roomCapacity.setCustomValidity('');
  } else {
    if(roomQuantityInt === 100) {
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
