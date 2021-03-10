import {objectsList} from './data.js';
import {getCardTemplate} from './card.js';
import './form.js';

const adsList = objectsList;

const cardTemplate = getCardTemplate(adsList[0]);

const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.appendChild(cardTemplate);
