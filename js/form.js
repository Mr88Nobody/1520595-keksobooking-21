'use strict';

(() => {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const MAX_PRICE = 1000000;
  const MIN_PRICES = {
    palace: 10000,
    house: 5000,
    flat: 1000,
    bungalow: 0
  };

  const getTitle = () => {
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
  };

  const getPrice = () => {
    const priceRent = document.querySelector(`#price`);
    const typeRent = document.querySelector(`#type`);

    typeRent.addEventListener(`change`, () => {
      priceRent.placeholder = MIN_PRICES[typeRent.value];
      priceRent.min = priceRent.placeholder;
      if (typeRent.value === `bungalow`) {
        priceRent.placeholder = MIN_PRICES.bungalow;
      }
    });

    priceRent.addEventListener(`input`, () => {
      const valuePrice = parseFloat(priceRent.value);
      let messageValidity = ``;
      if (valuePrice < priceRent.min) {
        messageValidity = `Минимальная цена за ночь ${priceRent.min} рублей`;
      } else if (valuePrice > MAX_PRICE) {
        messageValidity = `Максимальная цена за ночь ${MAX_PRICE} рублей`;
      } else {
        messageValidity = ``;
      }
      priceRent.setCustomValidity(messageValidity);
      priceRent.reportValidity();
    });
  };

  const checkTime = () => {
    const timein = document.querySelector(`#timein`);
    const timeout = document.querySelector(`#timeout`);

    const getCheckTime = (inHour, outHour) => {
      for (let i = 0; i < window.data.CHECK_TIMES.length; i++) {
        const checkHour = window.data.CHECK_TIMES[i];
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
      let messageValidity = ``;

      switch (capacity.value) {
        case `1`:
          if (rooms.value === `100`) {
            messageValidity = `Не для гостей`;
          } else {
            messageValidity = ``;
          }
          break;
        case `2`:
          if (rooms.value === `1`) {
            messageValidity = `Можете выбрать только 2, 3 комнаты`;
          } else if (rooms.value === `100`) {
            messageValidity = `Не для гостей`;
          } else {
            messageValidity = ``;
          }
          break;
        case `3`:
          if (rooms.value === `2`) {
            messageValidity = `Можете выбрать только 3 комнаты`;
          } else if (rooms.value === `1`) {
            messageValidity = `Можете выбрать только 3 комнаты`;
          } else if (rooms.value === `100`) {
            messageValidity = `Не для гостей`;
          } else {
            messageValidity = ``;
          }
          break;
        case `0`:
          if (rooms.value === `1`) {
            messageValidity = `Только 100 комнат`;
          } else if (rooms.value === `2`) {
            messageValidity = `Только 100 комнат`;
          } else if (rooms.value === `3`) {
            messageValidity = `Только 100 комнат`;
          } else {
            messageValidity = ``;
          }
          break;
        default:
          messageValidity = ``;
          break;
      }
      capacity.setCustomValidity(messageValidity);
      capacity.reportValidity();
    });
  };

  window.form = {
    getTitle,
    getPrice,
    checkTime,
    getCapacity
  };
})();
