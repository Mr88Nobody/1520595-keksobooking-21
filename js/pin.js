'use strict';

(() => {
  const X_COORDS = Math.round(65 / 2);
  const Y_COORDS = Math.round(65 / 2 + 18);

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
    const advertisements = window.data.createАdvertisements();
    const fragment = document.createDocumentFragment();
    const mapPins = document.querySelector(`.map__pins`);

    for (let i = 0; i < window.data.QUANTITY_ADVERTISEMENTS; i++) {
      fragment.append(renderPin(advertisements[i]));
    }
    mapPins.append(fragment);
  };

  window.pin = {
    renderPins,
    X_COORDS,
    Y_COORDS
  };
})();
