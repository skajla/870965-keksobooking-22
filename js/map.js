import {setFormEnabled} from './util.js';
import {getCardTemplate} from './card.js';


const mapLatLngMaxPlaces = 5;
const defaultLat = 35.6895000;
const defaultLng = 139.6917100;
const mapFiltersForm = document.querySelector('.map__filters');

const setMapFormEnabled = (isEnabled) => {
  let fieldsetItems = Array.from(mapFiltersForm.getElementsByTagName('fieldset')).concat(Array.from(mapFiltersForm.getElementsByTagName('select')));
  setFormEnabled(mapFiltersForm, fieldsetItems, isEnabled);
};

const initMap = (onLoad, notices) => {
  const map = L.map('map-canvas')
    .on('load', () => {
      onLoad();
      updateLatLngField(defaultLat, defaultLng);
    })

    .setView({
      lat: defaultLat,
      lng: defaultLng,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const mainPinMarker = L.marker(
    {
      lat: 35.6895000,
      lng: 139.6917100,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  const secondaryPinIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  notices.forEach(notice => {
    L.marker(
      {
        lat: notice.location.x,
        lng: notice.location.y,
      },
      {
        draggable: false,
        icon: secondaryPinIcon,
      },
    ).addTo(map).bindPopup(
      getCardTemplate(notice),
      {
        keepInView: true,
      },
    )
  });

  mainPinMarker.on('moveend', (evt) => {
    let latLng = evt.target.getLatLng() ;
    updateLatLngField(latLng.lat, latLng.lng);
  });
};

const updateLatLngField =(lat, lng)=>{
  const addressItem = document.querySelector('#address');
  addressItem.value = lat.toFixed(mapLatLngMaxPlaces) + ', ' + lng.toFixed(mapLatLngMaxPlaces);
};


export {setMapFormEnabled, initMap};
