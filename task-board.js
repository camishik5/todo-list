export default class TaskBoard {
    getTemplate() {
      return `<div class="task-board"></div>`;
    }
  
    getElement() {
      const element = document.createElement('div');
      element.innerHTML = this.getTemplate();
      return element.firstElementChild;
    }
  }
  