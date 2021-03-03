import {objectsList} from './data.js';
import {similarCardsListFragment} from './card.js';

objectsList;

const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.appendChild(similarCardsListFragment);
