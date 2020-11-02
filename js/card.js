'use strict';

(() => {
  const createCard = (advertisement) => {
    const cardTemplate = document.querySelector(`#card`);
    const card = cardTemplate.cloneNode(true);

    const title = card.querySelector(`popup__title`);
    title = advertisement.offer.title;

    const address = card.querySelector(`popup__text--address`);
    address = advertisement.offer.address;

    const price = card.querySelector(`popup__text--price`);
    price = `${advertisement.offer.price}₽/ночь`;

    const type = card.querySelector(`popup__type`);
    type = {
      bungalow: `Бунгало`,
      flat: `Квартира`,
      house: `Дом`,
      palace: `Дворец`
    };

    const capacity = card.querySelector(`popup__text--capacity`);
    capacity = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`;

    const checkTime = card.querySelector(`popup__text--time`);
    checkTime = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`;

    const features = card.querySelector(`popup__features`);
    features = advertisement.offer.features;

    const description = card.querySelector(`popup__description`);
    description = advertisement.offer.description;

    const img = card.querySelector(`popup__photos`);
    for (let i = 0; i < advertisement.offer.photos.length; i++) {
      const srcPhotoElement = advertisement.offer.photos[i];
      img.src = srcPhotoElement;
    }

    return card;
  };

  const renderCards = (advertisements) => {
    const fragment = document.createDocumentFragment();
    const mapFilter = document.querySelector(`.map__filters-container`);
    const node = document.createElement(`div`);

    for (let i = 0; i < window.data.QUANTITY_ADVERTISEMENTS; i++) {
      fragment.append(createCard(advertisements[i]));
    }
    node.append(fragment);
    mapFilter.insertAdjacentElement(`beforebegin`, node);
  };

  window.card = {
    renderCards
  };
})();
