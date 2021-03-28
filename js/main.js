import {setNoticeFormEnabled} from './form.js';
import {initMap, setNoticesToMap} from './map.js';
import {setMapFormEnabled, filterNoticesByFormFilters, initFormEvents} from './filter.js';
import {loadBookingData} from './network.js';
import {trimArray} from './util.js';

let allNotices = null;

const setFormsEnabled = (isEnabled) => {
  setMapFormEnabled(isEnabled);
  setNoticeFormEnabled(isEnabled);
};

setFormsEnabled(false);

const refreshData = () => {
  if(allNotices) {
    setNoticesToMap(filterNotices(allNotices));
    setMapFormEnabled(true);
  }
}

const filterNotices = (notices) => {
  let resultArray = filterNoticesByFormFilters(notices);
  return trimArray(resultArray);
}

const initMapLayout = () => {

  const nodataMessage = document.querySelector('.nodata');

  initMap().catch(() => {
    setMapFormEnabled(false);
    nodataMessage.classList.add('hidden');
  }).then(() => {
    loadBookingData().then((points) => {
      allNotices = points;
      refreshData();
      initFormEvents(refreshData);
    }).finally(() => {
      setNoticeFormEnabled(true);
    });
  });
};

initMapLayout();
