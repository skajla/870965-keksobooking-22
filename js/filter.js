import {setFormEnabled, setFormDisabled} from './util.js';


const mapFiltersForm = document.querySelector('.map__filters');

const setMapFormEnabled = (isEnabled) => {
  if(isEnabled) {
    setFormEnabled(mapFiltersForm, 'map__filters--disabled');
  }else {
    setFormDisabled(mapFiltersForm, 'map__filters--disabled');
  }
};


export {setMapFormEnabled};
