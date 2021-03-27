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

  const nodataMessage = document.querySelector('.nodata');

  initMap().catch(() => {
    setMapFormEnabled(false);
    nodataMessage.classList.add('hidden');
  }).then((map) => {
    if(map) {
      loadBookingData().then((points) => {
        setNoticesToMap(map, points);
        setMapFormEnabled(true);
      }).finally(() => {
        setNoticeFormEnabled(true);
      });
    }
  });
};

initMapLayout();
