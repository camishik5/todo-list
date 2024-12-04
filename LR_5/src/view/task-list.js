import { createElement } from './render.js';

function createTaskListTemplate(title) {
    return `
        <div class="task-list">
            <h2>${title}</h2>
        </div>
    `;
}

export default class TaskList {
    constructor(title) {
        this.title = title;
    }

    getTemplate() {
        return createTaskListTemplate(this.title);
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
