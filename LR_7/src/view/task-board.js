import { AbstractComponent } from '../framework/view/abstract-component.js'; // Импорт абстрактного компонента

export default class TaskBoard extends AbstractComponent {
    // Реализуем геттер template, который возвращает HTML-шаблон доски задач
    get template() {
        return `
            <section class="taskboard">
                <div class="taskboard__inner"></div>
            </section>
        `;
    }
}
