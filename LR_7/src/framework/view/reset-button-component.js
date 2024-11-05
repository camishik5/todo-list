import { createElement } from '../framework/render.js';

export default class ResetButtonComponent {
    #element = null;

    getTemplate() {
        return `<button class="reset-button">Очистить список</button>`;
    }

    getElement() {
        if (!this.#element) {
            this.#element = createElement(this.getTemplate());
        }
        return this.#element;
    }

    removeElement() {
        this.#element = null;
    }
}
