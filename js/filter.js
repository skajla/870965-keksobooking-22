import {formControls} from './util.js';


const mapFiltersForm = document.querySelector('.map__filters');

const setMapFormEnabled = (isEnabled) => {
  let fieldsetItems = Array.from(mapFiltersForm.getElementsByTagName('fieldset')).concat(Array.from(mapFiltersForm.getElementsByTagName('select')));
  formControls(mapFiltersForm, fieldsetItems, isEnabled);
};


export {setMapFormEnabled};
