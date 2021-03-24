import {setNoticeFormEnabled} from './form.js';
import {initMap, setNoticesToMap} from './map.js';
import {setMapFormEnabled} from './filter.js';
import {loadBookingData} from './network.js';


const setFormsEnabled = (isEnabled) => {
  setNoticeFormEnabled(isEnabled);
  setMapFormEnabled(isEnabled);
};

setFormsEnabled(false);


const initMapLayout = () => {
  Promise.all([
    initMap(),
    loadBookingData(),
  ]).then(results => {
    setNoticesToMap(results[0], results[1]);
  }).catch(
    () => {
      const nodataMessage = document.querySelector('.nodata');
      nodataMessage.classList.remove('hidden');
    },
  ).finally (() => {
    setFormsEnabled(true)
  })
};

initMapLayout();
