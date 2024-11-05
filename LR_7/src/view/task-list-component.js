import { createElement } from '../framework/render.js';

function createTasksListComponentTemplate(status, label) {
  return `
    <div class="task-list" data-status="${status}">
      <h2>${label}</h2>
    </div>
  `;
}

export default class TasksListComponent {
  #element = null;
  #status = null;
  #label = null;
  #onTaskDrop = null;

  constructor({ status, label, onTaskDrop }) {
    this.#status = status;
    this.#label = label;
    this.#onTaskDrop = onTaskDrop; // Передаём обработчик для события drop
    this.#element = createElement(this.template);
    this.#setDropHandler(onTaskDrop);
  }

  get template() {
    return createTasksListComponentTemplate(this.#status, this.#label);
  }

  get element() {
    return this.#element;
  }

  // Добавляем обработчики dragover и drop для списка задач
  #setDropHandler(onTaskDrop) {
    const container = this.element;

    container.addEventListener('dragover', (event) => {
      event.preventDefault(); // Разрешаем сброс в область списка
    });

    container.addEventListener('drop', (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData('text/plain'); // Получаем ID задачи
      console.log(`Task ${taskId} dropped in ${this.#status}`); // Для отладки
      onTaskDrop(taskId, this.#status); // Передаём ID задачи и новый статус
    });
  }
}
