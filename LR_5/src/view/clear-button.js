import { AbstractComponent } from '../framework/view/abstract-component.js'; // Импортируем абстрактный компонент

function createClearButtonTemplate() {
  return `
    <button class="clear-button" aria-label="Очистить корзину">Очистить корзину</button>
  `;
}

export default class ClearButtonComponent extends AbstractComponent {
  get template() {
    return createClearButtonTemplate(); // Возвращаем шаблон через геттер template
  }
}
