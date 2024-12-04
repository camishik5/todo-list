import { createElement } from './render.js';

function createTaskTemplate(taskName) {
    return `
        <div class="task">
            <p>${taskName}</p>
        </div>
    `;
}

export default class Task {
    constructor(name) {
        this.name = name;
    }

    getTemplate() {
        return createTaskTemplate(this.name);
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
