import {setFormEnabled, setFormDisabled, trimArray} from './util.js';


const mapFiltersForm = document.querySelector('.map__filters');
const housingTypeSelector = mapFiltersForm .querySelector('#housing-type');
const housingPriceSelector = mapFiltersForm .querySelector('#housing-price');
const housingRoomsSelector = mapFiltersForm .querySelector('#housing-rooms');
const housingGuestsSelector = mapFiltersForm .querySelector('#housing-guests');
const housingFeaturesBlock = mapFiltersForm .querySelector('#housing-features');

const filterDishwasher= housingFeaturesBlock.querySelector('#filter-dishwasher');
const filterParking = housingFeaturesBlock.querySelector('#filter-parking');
const filterWasher = housingFeaturesBlock.querySelector('#filter-washer');
const filterElevator = housingFeaturesBlock.querySelector('#filter-elevator');
const filterConditioner = housingFeaturesBlock.querySelector('#filter-conditioner');
const filterWifi = housingFeaturesBlock.querySelector('#filter-wifi');


const setMapFormEnabled = (isEnabled) => {
  if(isEnabled) {
    setFormEnabled(mapFiltersForm, 'map__filters--disabled');
  }else {
    setFormDisabled(mapFiltersForm, 'map__filters--disabled');
  }
};

const readMapFilters = () => {
  let features = new Array();
  if(filterDishwasher.checked) features.push('dishwasher');
  if(filterParking.checked) features.push('parking');
  if(filterWasher.checked) features.push('washer');
  if(filterElevator.checked) features.push('elevator');
  if(filterConditioner.checked) features.push('conditioner');
  if(filterWifi.checked) features.push('wifi');

  return {
    housingType: housingTypeSelector.value,
    housingPrice: housingPriceSelector.value,
    housingRooms: housingRoomsSelector.value,
    housingGuests: housingGuestsSelector.value,
    features: features,
  };
}

const filterNoticesByFormFilters = (notices) => {

  let filters = readMapFilters();

  return trimArray(notices.filter(notice => {
    let isCorrect = true;
    let offer = notice.offer;

    isCorrect = isCorrect && (filters.housingType === 'any' || filters.housingType == offer.type);
    isCorrect = isCorrect && (filters.housingRooms === 'any' || filters.housingRooms == offer.rooms);
    isCorrect = isCorrect && (filters.housingGuests === 'any' || filters.housingGuests == offer.guests);
    isCorrect = isCorrect && (filters.features.length === 0 || filters.features.every(v => offer.features.includes(v)));

    isCorrect = isCorrect && (filters.housingPrice === 'any' || (
      filters.housingPrice === 'low' && offer.price < 10000 ||
      filters.housingPrice === 'middle' && offer.price >= 10000 && offer.price < 50000 ||
      filters.housingPrice === 'low' && offer.price > 50000
    ));

    return isCorrect;
  },
  ))
}

const initFormEvents = (onChanged) => {

  housingTypeSelector.onchange = onChanged;
  housingPriceSelector.onchange = onChanged;
  housingRoomsSelector.onchange = onChanged;
  housingGuestsSelector.onchange = onChanged;
  housingFeaturesBlock.onchange = onChanged;

  filterDishwasher.onchange = onChanged;
  filterParking.onchange = onChanged;
  filterWasher.onchange = onChanged;
  filterElevator.onchange = onChanged;
  filterConditioner.onchange = onChanged;
  filterWifi.onchange = onChanged;
}

export {setMapFormEnabled, filterNoticesByFormFilters, initFormEvents};
