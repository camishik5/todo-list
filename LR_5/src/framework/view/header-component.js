import { AbstractComponent } from '../framework/view/abstract-component.js'; // Импортируем абстрактный компонент

function createHeaderComponentTemplate() {
  return `
    <header class="todo-header">
      <div class="todo-header__inner">
        <h1>Список задач</h1>
      </div>
    </header>
  `;
}

export default class HeaderComponent extends AbstractComponent {
  get template() {
    return createHeaderComponentTemplate(); // Возвращаем шаблон через геттер template
  }
}
