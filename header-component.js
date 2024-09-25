import { createElement } from './render.js';

function createHeaderComponentTemplate() {
  return (
    `<header class="todo-header">
      <div class="todo-header__inner">
        <h1>Список задач</h1>
      </div>
    </header>`
  );
}

export default class HeaderComponent {
  getTemplate() {
    return createHeaderComponentTemplate();
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
