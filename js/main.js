// {
//   "author": {
//       "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём.
//        Например, 01, 02 и т. д. Адреса изображений не повторяются
//   },
//   "offer": {
//       "title": строка, заголовок предложения
//       "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
//       "price": число, стоимость
//       "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalow
//       "rooms": число, количество комнат
//       "guests": число, количество гостей, которое можно разместить
//       "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
//       "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
//       "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
//       "description": строка с описанием,
//       "photos": массив строк случайной длины, содержащий адреса фотографий
// "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
//   },
//   "location": {
//       "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
//       "y": случайное число, координата y метки на карте от 130 до 630.
//   }
// }
"use strict";


const QUANTITY_ADVERTISEMENT = 8;
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const TYPE = [`palace`, `flat`, `house`, `bungalow`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const X_COORDS = 65/2;
const Y_COORDS = 65/2 + 18;

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

const advertisement = {
  author: {
    avatar: generateAvatarUrl(),
  },
  offer: {
    title: `Заголовок`,
    address: `600, 350`,
    price: ``,
    type: generateRandomItem(TYPE),
    rooms: getRandomNumber(1, 3),
    guests: getRandomNumber(1, 3),
    checkin: generateRandomItem(CHECKIN),
    checkout: generateRandomItem(CHECKOUT),
    features: generateRandomItem(FEATURES),
    description: `строка с описанием`,
    photos: generateRandomItem(PHOTOS)
  },
  location: {
    x: getRandomNumber(0, 630),
    y: getRandomNumber(130, 630)
  }
};

const generateАdvertisement = () => advertisement;

const createАdvertisements = () => {
  const newAdvertisement = [];
  for (let i = 0; i < QUANTITY_ADVERTISEMENT; i++) {
    newAdvertisement.push(generateАdvertisement());
  }
  return newAdvertisement;
};

const makeElement = function (tagName, className) {
  const element = document.createElement(tagName);
  if (className) {
    element.classList.add(className);
  }
  return element;
};

const templateAdvertisement = document.querySelector(`#pin`).content;
const elementPin = document.querySelector(`button`);
const map = document.querySelector(`.map`);
const mapPin = document.querySelector(`.map__pin`);
const mapPins = document.querySelector(`.map__pins`);
const fragment = document.createDocumentFragment();

const displayPin = () => {
  mapPin.style.left = advertisement.location.x + X_COORDS + `px`;
  mapPin.style.top = advertisement.location.y + Y_COORDS + `px`;

  const avatarItem = makeElement(`img`);
  avatarItem.src = advertisement.author.avatar;
  avatarItem.alt = advertisement.offer.title;
  mapPin.append(avatarItem);
  const cloneElementPin = templateAdvertisement.cloneNode(true);
  mapPins.append(cloneElementPin);

  return elementPin;
};
for (let i = 0; i < QUANTITY_ADVERTISEMENT; i++) {
  fragment.append(displayPin())
};

mapPins.append(fragment);

map.classList.remove(`map--faded`);
