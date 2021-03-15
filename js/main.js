import {objectsList} from './data.js';
import {setNoticeFormEnabled} from './form.js';
import {setMapFormEnabled, initMap} from './map.js';


const setFormsEnabled = (isEnabled) =>{
  setNoticeFormEnabled(isEnabled);
  setMapFormEnabled(isEnabled);
}

setFormsEnabled(false);

initMap(function() {
  setFormsEnabled(true);
}, objectsList);
