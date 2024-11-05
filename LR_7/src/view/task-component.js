import { createElement } from '../framework/render.js';

function createTaskTemplate(task) {
  return `
    <div class="task" draggable="true">
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
    this.#afterCreateElement(); // Вызовем метод после создания элемента
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

  #afterCreateElement() {
    this.#makeTaskDraggable(); // Делаем задачу перетаскиваемой
  }

  #makeTaskDraggable() {
    this.element.setAttribute('draggable', true);
    this.element.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', this.#task.id); // Сохраняем ID задачи при начале перетаскивания
      console.log(`Task ${this.#task.id} is being dragged`); // Для отладки
    });
  }

  removeElement() {
    this.#element = null;
  }
}
