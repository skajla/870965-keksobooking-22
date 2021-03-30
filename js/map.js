/* global L:readonly */


import {getCardTemplate} from './card.js';
import {resetFilterForm} from './filter.js';


const mapLatLngMaxPlaces = 5;
const defaultLat = 35.6895000;
const defaultLng = 139.6917100;

let noticesLayerGroup;
let map;


const secondaryPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

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

const initMap = (onMapLoaded) => {
  map = L.map('map-canvas');
  map.on('load', () => {
    updateLatLngField(defaultLat, defaultLng);
    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    ).addTo(map);

    mainPinMarker.addTo(map);
    mainPinMarker.on('moveend', (evt) => {
      const latLng = evt.target.getLatLng() ;
      updateLatLngField(latLng.lat, latLng.lng);
    });

    onMapLoaded();
  }).setView({
    lat: defaultLat,
    lng: defaultLng,
  }, 10);
};


const resetMap = () => {
  mainPinMarker.setLatLng(new L.LatLng(defaultLat, defaultLng));
  setTimeout(function() {
    updateLatLngField(defaultLat, defaultLng);
    resetFilterForm();
  }, 100);
};


const clearMap = () => {
  if(noticesLayerGroup) {
    map.removeLayer(noticesLayerGroup);
    noticesLayerGroup = null;
  }
};


const setNoticesToMap = (notices) => {
  if(map) {
    clearMap();
    let noticesLayer = notices.map(notice => {
      return L.marker(
        {
          lat: notice.location.lat,
          lng: notice.location.lng,
        },
        {
          draggable: false,
          icon: secondaryPinIcon,
        },
      ).bindPopup(
        getCardTemplate(notice),
        {
          keepInView: true,
        },
      )
    });
    noticesLayerGroup = L.layerGroup(noticesLayer);
    noticesLayerGroup.addTo(map);
  }
};


const addressItem = document.querySelector('#address');

const updateLatLngField = (lat, lng) => {
  addressItem.value = lat.toFixed(mapLatLngMaxPlaces) + ', ' + lng.toFixed(mapLatLngMaxPlaces);
};


export {initMap, setNoticesToMap, resetMap};
