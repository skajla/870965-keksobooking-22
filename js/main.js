import {objectsList} from './data.js';
import {setNoticeFormEnabled} from './form.js';
import {initMap} from './map.js';
import {setMapFormEnabled} from './filter.js';


const setFormsEnabled = (isEnabled) => {
  setNoticeFormEnabled(isEnabled);
  setMapFormEnabled(isEnabled);
}

setFormsEnabled(false);

initMap(() => {
  setFormsEnabled(true);
}, objectsList);
