import {setNoticeFormEnabled} from './form.js';
import {initMap, setNoticesToMap} from './map.js';
import {setMapFormEnabled} from './filter.js';
import {loadBookingData} from './network.js';


const setFormsEnabled = (isEnabled) => {
  setMapFormEnabled(isEnabled);
  setNoticeFormEnabled(isEnabled);
};

setFormsEnabled(false);


const initMapLayout = () => {
  Promise.all([
    initMap(),
    loadBookingData(),
  ]).then(results => {

    const [map, points] = results;
    setNoticesToMap(map, points);
    setMapFormEnabled(true);
  }).catch(
    () => {
      setMapFormEnabled(false);
      const nodataMessage = document.querySelector('.nodata');
      nodataMessage.classList.remove('hidden');
    },
  ).finally (() => {
    setNoticeFormEnabled(true);
  })
};

initMapLayout();
