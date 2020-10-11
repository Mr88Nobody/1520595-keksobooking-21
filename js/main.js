"use strict";

const QUANTITY_ADVERTISEMENTS = 8;
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const CHECKIN_TIMES = [`12:00`, `13:00`, `14:00`];
const CHECKOUT_TIMES = [`12:00`, `13:00`, `14:00`];
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const X_COORDS = Math.round(65 / 2);
const Y_COORDS = Math.round(65 / 2 + 18);

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const generateAvatarUrl = () => {
  const num = getRandomNumber(1, 9);
  const urlAvatarImg = `img/avatars/user0${num}.png`;
  return urlAvatarImg;
};

const generateRandomItem = (arr) => {
  const random = getRandomNumber(0, arr.length);
  return arr[random];
};

const generateАdvertisement = () => {
  return {
    author: {
      avatar: generateAvatarUrl(),
    },
    offer: {
      title: `Заголовок`,
      address: `600, 350`,
      price: ``,
      type: generateRandomItem(TYPES),
      rooms: getRandomNumber(1, 3),
      guests: getRandomNumber(1, 3),
      checkin: generateRandomItem(CHECKIN_TIMES),
      checkout: generateRandomItem(CHECKOUT_TIMES),
      features: generateRandomItem(FEATURES),
      description: `строка с описанием`,
      photos: generateRandomItem(PHOTOS)
    },
    location: {
      x: getRandomNumber(0, 630),
      y: getRandomNumber(130, 630)
    }
  };
};

const createАdvertisements = () => {
  const arrayАdvertisements = [];
  for (let i = 0; i < QUANTITY_ADVERTISEMENTS; i++) {
    arrayАdvertisements.push(generateАdvertisement());
  }
  return arrayАdvertisements;
};

const renderPin = (advertisement) => {
  const mapPinTemplate = document.querySelector(`.map__pin`);
  const pin = mapPinTemplate.cloneNode(true);

  pin.style.left = advertisement.location.x + X_COORDS + `px`;
  pin.style.top = advertisement.location.y + Y_COORDS + `px`;

  const img = pin.querySelector(`img`);
  img.src = advertisement.author.avatar;
  img.alt = advertisement.offer.title;

  return pin;
};

const renderPins = () => {
  const advertisements = createАdvertisements();
  const fragment = document.createDocumentFragment();
  const mapPins = document.querySelector(`.map__pins`);

  for (let i = 0; i < QUANTITY_ADVERTISEMENTS; i++) {
    fragment.append(renderPin(advertisements[i]));
  }
  mapPins.append(fragment);
};

renderPins();

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);
