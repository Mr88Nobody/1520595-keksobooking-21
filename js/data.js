'use strict';

(() => {
  const QUANTITY_ADVERTISEMENTS = 8;
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const CHECK_TIMES = [`12:00`, `13:00`, `14:00`];
  const TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

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

  window.data = {
    createАdvertisements,
    CHECK_TIMES,
    QUANTITY_ADVERTISEMENTS
  };
})();
