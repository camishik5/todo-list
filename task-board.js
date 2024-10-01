// src/view/task-board.js
import { createElement } from '../framework/render.js'; // Импорт функции createElement

function createTaskBoardTemplate() {
    return `
        <section class="taskboard">
            <div class="taskboard__inner"></div>
        </section>
    `;
}

export default class TaskBoard {
    getTemplate() {
        return createTaskBoardTemplate(); // Возвращаем шаблон доски задач
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate()); // Создаем элемент DOM, если его еще нет
        }
        return this.element;
    }

    removeElement() {
        this.element = null; // Удаляем элемент, если он больше не нужен
    }
}
