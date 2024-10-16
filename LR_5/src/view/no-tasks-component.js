import { AbstractComponent } from '../framework/view/abstract-component.js'; // Импорт абстрактного компонента

// Функция для создания HTML-шаблона заглушки
function createNoTasksTemplate() {
    return `
        <p class="no-tasks">Перетащите карточку</p>
    `;
}

export default class NoTasksComponent extends AbstractComponent {
    get template() {
        return createNoTasksTemplate(); // Возвращаем HTML-шаблон заглушки
    }
}
