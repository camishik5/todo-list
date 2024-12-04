import { AbstractComponent } from '../framework/view/abstract-component.js';

function createAreaTaskTemplate() {
  return `<div class="task-area"></div>`;
}

export default class AreaTask extends AbstractComponent {
  get template() { 
    return createAreaTaskTemplate();
  }
}
