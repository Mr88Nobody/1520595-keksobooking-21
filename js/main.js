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
      x: getRandomNumber(0, 1100),
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

const mapPinMain = document.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map`);
const adForm = document.querySelector(`.ad-form`);
const fieldsets = document.querySelectorAll(`fieldset`);
const mapFilters = document.querySelector(`.map__filters`).children;

const activetedHandler = () => {
  if (adForm.classList.contains(`ad-form--disabled`)) {
    for (const elem of mapFilters) {
      elem.setAttribute(`disabled`, `disabled`);
    }

    for (const fieldset of fieldsets) {
      fieldset.setAttribute(`disabled`, `disabled`);
    }

    mapPinMain.addEventListener(`mousedown`, (evtMousePressed) => {
      evtMousePressed.preventDefault();
      if (evtMousePressed.button === 0) {
        map.classList.remove(`map--faded`);
        adForm.classList.remove(`ad-form--disabled`);
        renderPins();
        for (const fieldset of fieldsets) {
          fieldset.removeAttribute(`disabled`, `disabled`);
        }
        for (const elem of mapFilters) {
          elem.removeAttribute(`disabled`, `disabled`);
        }
      }
    });

    mapPinMain.addEventListener(`keydown`, (evtKeyPressed) => {
      if (evtKeyPressed.key === `Enter`) {
        evtKeyPressed.preventDefault();
        map.classList.remove(`map--faded`);
        adForm.classList.remove(`ad-form--disabled`);
        renderPins();
        for (const fieldset of fieldsets) {
          fieldset.removeAttribute(`disabled`, `disabled`);
        }
        for (const elem of mapFilters) {
          elem.removeAttribute(`disabled`, `disabled`);
        }
      }
    });
  }
};

activetedHandler();

const titleAdvertisement = document.querySelector(`#title`);
const priceRent = document.querySelector(`#price`);
const typeRent = document.querySelector(`#type`);

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
// const MIN_PRICE = 0;
const MAX_PRICE = 1000000;

titleAdvertisement.addEventListener(`input`, () => {
  const valueLength = titleAdvertisement.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleAdvertisement.setCustomValidity(`Ещё ` + (MIN_TITLE_LENGTH - valueLength) + ` симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleAdvertisement.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_TITLE_LENGTH) + ` симв.`);
  } else {
    titleAdvertisement.setCustomValidity(``);
  }

  titleAdvertisement.reportValidity();
});

const valuePrice = priceRent.value;

typeRent.addEventListener(`change`, () => {
  if (typeRent.value === `bungalow`) {
    priceRent.value = 0;
  }
  if (typeRent.value === `flat`) {
    priceRent.value = 1000;
    priceRent.min = 1000;
  }
  if (typeRent.value === `house`) {
    priceRent.value = 5000;
    priceRent.min = 5000;
  }
  if (typeRent.value === `palace`) {
    priceRent.value = 10000;
    priceRent.min = 10000;
  }
});

priceRent.addEventListener(`input`, () => {
  if (valuePrice > MAX_PRICE) {
    priceRent.setCustomValidity(`Максимальная цена за ночь один миллион рублей`);
  } else {
    priceRent.setCustomValidity(``);
  }

  priceRent.reportValidity();
});

const timein = document.querySelector(`#timein`);
const timeout = document.querySelector(`#timeout`);

timein.addEventListener(`change`, () => {
  if (timein.value === `12:00`) {
    timeout.value = `12:00`;
  }
  if (timein.value === `13:00`) {
    timeout.value = `13:00`;
  }
  if (timein.value === `14:00`) {
    timeout.value = `14:00`;
  }
});

timeout.addEventListener(`change`, () => {
  if (timeout.value === `12:00`) {
    timein.value = `12:00`;
  }
  if (timeout.value === `13:00`) {
    timein.value = `13:00`;
  }
  if (timeout.value === `14:00`) {
    timein.value = `14:00`;
  }
});

const rooms = document.querySelector(`#room_number`);
const capacity = document.querySelector(`#capacity`);

capacity.addEventListener(`change`, () => {
  if (capacity.value === `0`) {
    rooms.value = `100`;
  }
  if (capacity.value === `1`) {
    rooms.value = `1`;
    rooms.value = `2`;
    rooms.value = `3`;
  }
  if (capacity.value === `2`) {
    rooms.value = `2`;
    rooms.value = `3`;
  }
  if (capacity.value === `3`) {
    rooms.value = `3`;
  }
});

rooms.addEventListener(`change`, () => {
  if (rooms.value === `100`) {
    capacity.value = `0`;
  }
  if (rooms.value === `1`) {
    capacity.value = `1`;
  }
  if (rooms.value === `2`) {
    capacity.value = `2`;
    capacity.value = `1`;
  }
  if (rooms.value === `3`) {
    capacity.value = `3`;
    capacity.value = `2`;
    capacity.value = `1`;
  }
});
