import { AbstractComponent } from '../framework/view/abstract-component.js'; // Импорт абстрактного компонента

// Функция для создания HTML-шаблона задачи
function createTaskComponentTemplate(task) {
    const { title, status } = task; // Деструктуризация объекта задачи
    return `
        <div class="taskboard__item task task--${status}">
            <div class="task__body">
                <p class="task__view">${title}</p>
                <input type="text" class="task__input" value="${title}" />
            </div>
            <button aria-label="Изменить" class="task__edit" type="button"></button>
        </div>
    `;
}

export default class TaskComponent extends AbstractComponent { // Наследуемся от AbstractComponent
    constructor({ task }) {
        super(); // Вызов конструктора абстрактного класса
        this.task = task; // Сохраняем объект задачи
    }

    get template() {
        return createTaskComponentTemplate(this.task); // Используем шаблон задачи
    }
}
