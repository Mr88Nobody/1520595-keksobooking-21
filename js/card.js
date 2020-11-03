'use strict';

(() => {
  const createCard = (advertisement) => {
    const cardTemplate = document.querySelector(`#card`).content;
    const card = cardTemplate.cloneNode(true);

    const title = card.querySelector(`.popup__title`);
    title.textContent = advertisement.offer.title;

    const address = card.querySelector(`.popup__text--address`);
    address.textContent = advertisement.offer.address;

    const price = card.querySelector(`.popup__text--price`);
    price.textContent = `${advertisement.offer.price}₽/ночь`;

    const type = card.querySelector(`.popup__type`);

    const typeProperty = {
      bungalow: `Бунгало`,
      flat: `Квартира`,
      house: `Дом`,
      palace: `Дворец`
    };

    switch (advertisement.offer.type) {
      case `bungalow`:
        type.textContent = typeProperty.bungalow;
        break;
      case `flat`:
        type.textContent = typeProperty.flat;
        break;
      case `house`:
        type.textContent = typeProperty.house;
        break;
      case `palace`:
        type.textContent = typeProperty.palace;
        break;
    }

    const capacity = card.querySelector(`.popup__text--capacity`);
    capacity.textContent = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`;

    const checkTime = card.querySelector(`.popup__text--time`);
    checkTime.textContent = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`;

    const features = card.querySelector(`.popup__features`);
    for (let i = 0; i < advertisement.offer.features.length; i++) {
      const featuresElement = advertisement.offer.features[i];
      features.textContent = featuresElement;
    }

    const description = card.querySelector(`.popup__description`);
    description.textContent = advertisement.offer.description;

    const img = card.querySelector(`.popup__photo`);
    for (let i = 0; i < advertisement.offer.photos.length; i++) {
      const srcPhotoElement = advertisement.offer.photos[i];
      img.src = srcPhotoElement;
    }

    return card;
  };

  const renderCard = (advertisements) => {
    const fragment = document.createDocumentFragment();
    const mapFilter = document.querySelector(`.map__filters-container`);
    const node = document.createElement(`div`);
    fragment.append(createCard(advertisements));
    node.append(fragment);
    mapFilter.insertAdjacentElement(`beforebegin`, node);
  };

  window.card = {
    renderCard
  };
})();
