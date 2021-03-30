import {setFormEnabled, setFormDisabled, trimArray} from './util.js';

const FILTER_VALUE_ANY = 'any';
const FILTER_VALUE_LOW = 'low';
const FILTER_VALUE_MIDDLE = 'middle';
const FILTER_VALUE_HIGH = 'high';

const MAX_FOR_LOW_PRICE = 10000;
const MAX_FOR_MIDDLE_PRICE = 50000;

const mapFiltersForm = document.querySelector('.map__filters');
const housingTypeSelector = mapFiltersForm.querySelector('#housing-type');
const housingPriceSelector = mapFiltersForm.querySelector('#housing-price');
const housingRoomsSelector = mapFiltersForm.querySelector('#housing-rooms');
const housingGuestsSelector = mapFiltersForm.querySelector('#housing-guests');
const housingFeaturesBlock = mapFiltersForm.querySelector('#housing-features');
const filterDishwasher = housingFeaturesBlock.querySelector('#filter-dishwasher');
const filterParking = housingFeaturesBlock.querySelector('#filter-parking');
const filterWasher = housingFeaturesBlock.querySelector('#filter-washer');
const filterElevator = housingFeaturesBlock.querySelector('#filter-elevator');
const filterConditioner = housingFeaturesBlock.querySelector('#filter-conditioner');
const filterWifi = housingFeaturesBlock.querySelector('#filter-wifi');

let onFilterItemChanged;


const setMapFormEnabled = (isEnabled) => {
  if(isEnabled) {
    setFormEnabled(mapFiltersForm, 'map__filters--disabled');
  } else {
    setFormDisabled(mapFiltersForm, 'map__filters--disabled');
  }
};


const readMapFilters = () => {
  let features = new Array();

  if(filterDishwasher.checked) {
    features.push('dishwasher');
  }

  if(filterParking.checked) {
    features.push('parking');
  }

  if(filterWasher.checked) {
    features.push('washer');
  }

  if(filterElevator.checked) {
    features.push('elevator');
  }

  if(filterConditioner.checked) {
    features.push('conditioner');
  }

  if(filterWifi.checked) {
    features.push('wifi');
  }

  return {
    housingType: housingTypeSelector.value,
    housingPrice: housingPriceSelector.value,
    housingRooms: housingRoomsSelector.value,
    housingGuests: housingGuestsSelector.value,
    features: features,
  };
};


const filterNoticesByFormFilters = (notices) => {
  let filters = readMapFilters();
  return trimArray(notices.filter(notice => {
    let offer = notice.offer;
    let isCheckingSuccess = filters.housingType === FILTER_VALUE_ANY || filters.housingType === offer.type;
    isCheckingSuccess = isCheckingSuccess && (filters.housingRooms === FILTER_VALUE_ANY || parseInt(filters.housingRooms) === offer.rooms);
    isCheckingSuccess = isCheckingSuccess && (filters.housingGuests === FILTER_VALUE_ANY || parseInt(filters.housingGuests) === offer.guests);
    isCheckingSuccess = isCheckingSuccess && (filters.features.length === 0 || filters.features.every(v => offer.features.includes(v)));

    isCheckingSuccess = isCheckingSuccess && (filters.housingPrice === FILTER_VALUE_ANY || (
      filters.housingPrice === FILTER_VALUE_LOW && offer.price < MAX_FOR_LOW_PRICE ||
      filters.housingPrice === FILTER_VALUE_MIDDLE && offer.price >= MAX_FOR_LOW_PRICE && offer.price < MAX_FOR_MIDDLE_PRICE ||
      filters.housingPrice === FILTER_VALUE_HIGH && offer.price > MAX_FOR_MIDDLE_PRICE
    ));

    return isCheckingSuccess;
  },
  ))
};


const initFormEvents = (onFilterItemChange) => {
  onFilterItemChanged = onFilterItemChange;
  housingTypeSelector.onchange = onFilterItemChange;
  housingPriceSelector.onchange = onFilterItemChange;
  housingRoomsSelector.onchange = onFilterItemChange;
  housingGuestsSelector.onchange = onFilterItemChange;
  housingFeaturesBlock.onchange = onFilterItemChange;
  filterDishwasher.onchange = onFilterItemChange;
  filterParking.onchange = onFilterItemChange;
  filterWasher.onchange = onFilterItemChange;
  filterElevator.onchange = onFilterItemChange;
  filterConditioner.onchange = onFilterItemChange;
  filterWifi.onchange = onFilterItemChange;
};


const resetFilterForm = () => {
  mapFiltersForm.reset();
  if (onFilterItemChanged) {
    onFilterItemChanged();
  }
};


export {setMapFormEnabled, filterNoticesByFormFilters, initFormEvents, resetFilterForm};
