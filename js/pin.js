'use strict';

(() => {
  const X_COORDS = 31;
  const Y_COORDS = 49;

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

  const renderPins = (advertisements) => {
    const fragment = document.createDocumentFragment();
    const mapPins = document.querySelector(`.map__pins`);

    for (let i = 0; i < window.data.QUANTITY_ADVERTISEMENTS; i++) {
      fragment.append(renderPin(advertisements[i]));
    }
    mapPins.append(fragment);
    window.card.renderCard(advertisements[0]);
  };

  const errorHandler = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.pin = {
    renderPins,
    errorHandler,
    X_COORDS,
    Y_COORDS
  };
})();
