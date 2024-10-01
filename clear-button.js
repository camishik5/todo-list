import { createElement } from '../framework/render.js';

function createClearButtonTemplate() {
  return `
    <button class="clear-button" aria-label="Очистить корзину">Очистить корзину</button>
  `;
}

export default class ClearButtonComponent {
  constructor() {}

  getTemplate() {
    return createClearButtonTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
