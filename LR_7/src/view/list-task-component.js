import { StatusLabel } from '../const.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createListTaskTemplate(status) {
  return `<li class="tasks-area__item">
            <h3 class="title tasks-area__title title__${status}">${StatusLabel[status]}</h3>
            <ul class="tasks__list tasks__${status} list-reset"></ul>
          </li>`;
}

export default class ListTask extends AbstractComponent {
  constructor({status, label, onTaskDrop}) {
    super();
    this.status = status;
    this.label = label;
    this.onTaskDrop = onTaskDrop;
    this.#setDropHandler(onTaskDrop);
  }

  get template() {
    return createListTaskTemplate(this.status, this.label);
  }

  #setDropHandler(onTaskDrop) {
    const container = this.element;

    container.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    container.addEventListener('drop', (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData('text/plain');
      const dropTarget = event.target.closest('.tasks__list');
      if (dropTarget) {
        const index = Array.from(dropTarget.children).indexOf(event.target.closest('.tasks__item'));
        this.onTaskDrop(taskId, this.status, index);
      }
    });
  }
}
