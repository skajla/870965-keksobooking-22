const minPricePerNight = {
  'flat': 1000,
  'bungalow': 0,
  'house': 5000,
  'palace': 10000,
};

const formItem = document.querySelector('.ad-form');
const pricePerNight = formItem.querySelector('#price');
const typeSelector = formItem.querySelector('#type');

const onTypeChanged = () => {
  changePricePlaceholder(typeSelector.value)
};

const changePricePlaceholder = (type) => {
  const minPrice = minPricePerNight[type];
  pricePerNight.setAttribute('placeholder', minPrice);
};

changePricePlaceholder(typeSelector.value);

typeSelector.onchange = onTypeChanged;


const roomNumber = formItem.querySelector('#room_number');
const roomCapacity = formItem.querySelector('#capacity');

const validateRooms = () => {

  let isValid = roomNumber.value === 100 && roomCapacity.value === 0 || roomNumber.value != 100 && roomCapacity.value != 0 && roomNumber.value >= roomCapacity.value;

  if(isValid) {
    roomCapacity.setCustomValidity('');
  } else {
    if(roomNumber.value == 100) {
      roomCapacity.setCustomValidity('100 комнат только не для гостей!!!');
    } else {
      roomCapacity.setCustomValidity('Гостей много, а комнат мало!!!');
    }
  }
};

roomCapacity.onchange = () => {
  validateRooms()
};

roomNumber.onchange = () => {
  validateRooms()
};
