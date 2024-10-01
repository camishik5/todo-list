import { AbstractComponent } from '../framework/view/abstract-component.js'; // Импорт абстрактного компонента

function createTasksListComponentTemplate(title) {
    return `
        <section class="task-list">
            <h2>${title}</h2>
            <div class="tasks"></div>
        </section>
    `;
}

export default class TasksListComponent extends AbstractComponent {
    constructor(title) {
        super(); // Вызов конструктора абстрактного класса
        this.title = title; // Сохраняем заголовок списка задач
    }

    get template() {
        return createTasksListComponentTemplate(this.title); // Возвращаем шаблон списка задач
    }
}
