'use strict';

(() => {
  const activatePage = () => {
    const mapPinMain = document.querySelector(`.map__pin--main`);
    const map = document.querySelector(`.map`);
    const mapFilters = document.querySelector(`.map__filters`).children;
    const fieldsets = document.querySelectorAll(`fieldset`);
    const adForm = document.querySelector(`.ad-form`);
    const address = document.querySelector(`#address`);
    const left = parseFloat(mapPinMain.style.left);
    const top = parseFloat(mapPinMain.style.top);
    address.value = `${left - window.pin.X_COORDS}, ${top - window.pin.Y_COORDS}`;

    const makeActive = () => {
      if (map.classList.contains(`map--faded`)) {
        map.classList.remove(`map--faded`);
        adForm.classList.remove(`ad-form--disabled`);
        window.load.loadData(window.pin.renderPins, window.pin.errorHandler);
        for (const fieldset of fieldsets) {
          fieldset.removeAttribute(`disabled`, `disabled`);
        }
        for (const elementMapFilters of mapFilters) {
          elementMapFilters.removeAttribute(`disabled`, `disabled`);
        }
      }
    };

    if (map.classList.contains(`map--faded`)) {
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
  window.map = {
    activatePage
  };
})();
