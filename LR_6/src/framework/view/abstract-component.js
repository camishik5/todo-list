import { createElement } from '../render.js'; // Проверьте правильность пути

export class AbstractComponent {
    #element = null;

    constructor() {
        if (new.target === AbstractComponent) {
            throw new Error("Can't instantiate AbstractComponent, only concrete one.");
        }
    }

    get element() {
        if (!this.#element) {
            this.#element = createElement(this.template); // Создаем элемент, если он еще не создан
        }
        return this.#element;
    }

    get template() {
        throw new Error('Abstract method not implemented: get template'); // Метод шаблона должен быть переопределен
    }

    removeElement() {
        this.#element = null; // Очищаем элемент
    }
}
