import { createElement } from '../framework/render.js';

function createTasksListComponentTemplate(title) {
    return (
        `<section class="task-list">
            <h2>${title}</h2>
            <div class="tasks"></div>
        </section>`
    );
}

export default class TasksListComponent {
    constructor(title) {
        this.title = title;
    }

    getTemplate() {
        return createTasksListComponentTemplate(this.title);
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
