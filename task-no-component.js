import { AbstractComponent } from "../framework/view/abstract-component.js";

function createNoTaskComponentTemplate() {
  return `<p class="tasks__item">Нет задач</p>`;
}

export default class NoTaskComponent extends AbstractComponent {
  get template() {
    return createNoTaskComponentTemplate();
  }
}