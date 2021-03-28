/* global L:readonly */


import {getCardTemplate} from './card.js';


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


const initMap = async () => {
  map = L.map('map-canvas')
    .on('load', () => {
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
  mainPinMarker.on('moveend', (evt) => {
    const latLng = evt.target.getLatLng() ;
    updateLatLngField(latLng.lat, latLng.lng);
  });
  return true;
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


export {initMap, setNoticesToMap};
