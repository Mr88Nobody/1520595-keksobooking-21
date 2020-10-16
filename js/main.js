"use strict";

const QUANTITY_ADVERTISEMENTS = 8;
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const CHECK_TIMES = [`12:00`, `13:00`, `14:00`];
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const X_COORDS = Math.round(65 / 2);
const Y_COORDS = Math.round(65 / 2 + 18);
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;

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
      checkin: generateRandomItem(CHECK_TIMES),
      checkout: generateRandomItem(CHECK_TIMES),
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

const activetePage = () => {
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const map = document.querySelector(`.map`);
  const mapFilters = document.querySelector(`.map__filters`).children;
  const fieldsets = document.querySelectorAll(`fieldset`);
  const adForm = document.querySelector(`.ad-form`);

  const makeActive = () => {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    renderPins();
    for (const fieldset of fieldsets) {
      fieldset.removeAttribute(`disabled`, `disabled`);
    }
    for (const elementMapFilters of mapFilters) {
      elementMapFilters.removeAttribute(`disabled`, `disabled`);
    }
  };

  if (adForm.classList.contains(`ad-form--disabled`)) {
    for (const elementMapFilters of mapFilters) {
      elementMapFilters.setAttribute(`disabled`, `disabled`);
    }

    for (const fieldset of fieldsets) {
      fieldset.setAttribute(`disabled`, `disabled`);
    }

    mapPinMain.addEventListener(`mousedown`, (evtMousePressed) => {
      if (evtMousePressed.button === 0) {
        evtMousePressed.preventDefault();
        makeActive();
      }
    });

    mapPinMain.addEventListener(`keydown`, (evtKeyPressed) => {
      if (evtKeyPressed.key === `Enter`) {
        evtKeyPressed.preventDefault();
        makeActive();
      }
    });
  }
};

const titleAdvertisement = document.querySelector(`#title`);
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

const getPrice = () => {
  const priceRent = document.querySelector(`#price`);
  const typeRent = document.querySelector(`#type`);

  typeRent.addEventListener(`change`, () => {
    switch (typeRent.value) {
      case `bungalow`:
        priceRent.value = 0;
        priceRent.setCustomValidity(`Бесплатно`);
        priceRent.reportValidity();
        break;
      case `flat`:
        priceRent.value = 1000;
        priceRent.min = 1000;
        priceRent.setCustomValidity(`Минимальная цена за ночь одна тысяча рублей`);
        priceRent.reportValidity();
        break;
      case `house`:
        priceRent.value = 5000;
        priceRent.min = 5000;
        priceRent.setCustomValidity(`Минимальная цена за ночь пять тысяч рублей`);
        priceRent.reportValidity();
        break;
      case `palace`:
        priceRent.value = 10000;
        priceRent.min = 10000;
        priceRent.setCustomValidity(`Минимальная цена за ночь десять тысяч рублей`);
        priceRent.reportValidity();
        break;
    }
  });

  priceRent.addEventListener(`input`, () => {
    const valuePrice = priceRent.value;
    if (valuePrice > MAX_PRICE) {
      priceRent.setCustomValidity(`Максимальная цена за ночь один миллион рублей`);
    } else {
      priceRent.setCustomValidity(``);
    }

    priceRent.reportValidity();
  });
};

const checkTime = () => {
  const timein = document.querySelector(`#timein`);
  const timeout = document.querySelector(`#timeout`);

  const getCheckTime = (inHour, outHour) => {
    for (let i = 0; i < CHECK_TIMES.length; i++) {
      const checkHour = CHECK_TIMES[i];
      if (inHour.value === checkHour) {
        outHour.value = checkHour;
      }
    }
  };

  timein.addEventListener(`change`, () => {
    getCheckTime(timein, timeout);
  });

  timeout.addEventListener(`change`, () => {
    getCheckTime(timeout, timein);
  });
};

const getCapacity = () => {
  const rooms = document.querySelector(`#room_number`);
  const capacity = document.querySelector(`#capacity`);

  capacity.addEventListener(`change`, () => {
    switch (capacity.value) {
      case `0`:
        capacity.setCustomValidity(`100 комнат`);
        break;
      case `1`:
        capacity.setCustomValidity(`Можете выбрать 1, 2, 3 комнаты`);
        break;
      case `2`:
        capacity.setCustomValidity(`Можете выбрать 2 или 3 комнаты`);
        break;
      case `3`:
        capacity.setCustomValidity(`Можете выбрать только 3 комнаты`);
        break;
    }
    capacity.reportValidity();
  });

  rooms.addEventListener(`change`, () => {
    switch (rooms.value) {
      case `100`:
        rooms.setCustomValidity(`Не для гостей`);
        break;
      case `1`:
        rooms.setCustomValidity(`Только для одного человека`);
        break;
      case `2`:
        rooms.setCustomValidity(`Для двоих или одного человек`);
        break;
      case `3`:
        rooms.setCustomValidity(`Для троих, двоих или одного человека`);
        break;
    }
    rooms.reportValidity();
  });
};

activetePage();
getPrice();
checkTime();
getCapacity();
