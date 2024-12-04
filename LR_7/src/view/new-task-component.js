import { AbstractComponent } from '../framework/view/abstract-component.js';

function createNewTaskTemplate() {
    return (
        `<div class="new-task">
            <input type="text" class="new-task__input" placeholder="Название задачи">
            <button type="button">Добавить</button>
        </div></div>`
    );
}

export default class NewTask extends AbstractComponent {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    if (typeof onClick !== 'function') {
      throw new Error('onClick должен быть функцией');
    }
    this.#handleClick = onClick;
  }

  get template() {
    return createNewTaskTemplate();
  }

  get element() {
    if (!this._element) {
      this._element = super.element;
      this._element.querySelector('button').addEventListener('click', this.#clickHandler);
    }
    return this._element;
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    const taskTitle = this.element.querySelector('input').value.trim();
    if (taskTitle) {
        this.#handleClick(taskTitle); 
    }
  };
}
