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
