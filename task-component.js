import { createElement } from '../framework/render.js'; // Не забудьте импортировать утилиту для создания DOM-элемента

// Функция для создания HTML-шаблона задачи
function createTaskComponentTemplate(task) {
    const { title, status } = task; // Деструктуризация объекта задачи
    return (
        `<div class="taskboard__item task task--${status}">
            <div class="task__body">
                <p class="task__view">${title}</p>
                <input type="text" class="task__input" />
            </div>
            <button aria-label="Изменить" class="task__edit" type="button"></button>
        </div>`
    );
}

export default class TaskComponent {
    constructor({ task }) {
        this.task = task;
    }

    getTemplate() {
        return createTaskComponentTemplate(this.task); // Используем функцию шаблона для создания DOM элемента
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate()); // Создаем элемент DOM
        }
        return this.element;
    }

    removeElement() {
        this.element = null; // Удаляем элемент, если нужно очистить память
    }
}
