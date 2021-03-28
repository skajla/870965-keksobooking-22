/* global _:readonly */


import {setNoticeFormEnabled} from './form.js';
import {initMap, setNoticesToMap} from './map.js';
import {setMapFormEnabled, filterNoticesByFormFilters, initFormEvents} from './filter.js';
import {loadBookingData} from './network.js';
import {trimArray} from './util.js';


const RERENDER_DELAY = 500;
let allNotices = null;
let lastRefresh = null;


const setFormsEnabled = (isEnabled) => {
  setMapFormEnabled(isEnabled);
  setNoticeFormEnabled(isEnabled);
};

setFormsEnabled(false);


const refreshData = (immediately = false) => {
  let delay;
  if (immediately === true) {
    delay = 0;
  } else {
    delay = RERENDER_DELAY;
  }

  if(lastRefresh) {
    lastRefresh.cancel()
  }

  lastRefresh = _.debounce(
    () => {
      if(allNotices) {
        setNoticesToMap(filterNotices(allNotices));
        setMapFormEnabled(true);
      }
    },
    delay,
  );
  lastRefresh();
};


const filterNotices = (notices) => {
  let resultArray = filterNoticesByFormFilters(notices);
  return trimArray(resultArray);
};


const initMapLayout = () => {
  const nodataMessage = document.querySelector('.nodata');

  initMap().catch(() => {
    setMapFormEnabled(false);
    nodataMessage.classList.add('hidden');
  }).then((isInitialized) => {
    if (isInitialized) {
      loadBookingData().then((points) => {
        allNotices = points;
        refreshData(true);
        initFormEvents(refreshData);
      }).finally(() => {
        setNoticeFormEnabled(true);
      });
    }
  });
};


initMapLayout();
