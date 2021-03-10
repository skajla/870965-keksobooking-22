// import {objectsList} from './data.js';
// import {similarCardsListFragment} from './card.js';

// objectsList;

// const mapCanvas = document.querySelector('#map-canvas');

// mapCanvas.appendChild(similarCardsListFragment);


import {objectsList} from './data.js';
import {getCardTemplate} from './card.js';

const adsList = objectsList;

const cardTemplate = getCardTemplate(adsList[0]);

const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.appendChild(cardTemplate);
