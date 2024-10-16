import { createElement } from '../framework/render.js';

function createTaskTemplate(task) {
  return `
    <div class="task">
      <span>${task.title}</span>
      <button class="delete-task-button">Удалить</button>
    </div>
  `;
}

export default class TaskComponent {
  #element = null;
  #task = null;
  #handleDeleteClick = null;

  constructor({ task, onDelete }) {
    this.#task = task;
    this.#handleDeleteClick = onDelete;
  }

  get template() {
    return createTaskTemplate(this.#task);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
      this.#element.querySelector('.delete-task-button').addEventListener('click', () => {
        this.#handleDeleteClick(); // Обработчик для удаления задачи
      });
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
