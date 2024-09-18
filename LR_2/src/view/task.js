export default class Task {
    constructor(taskText) {
      this.taskText = taskText;
    }
  
    getTemplate() {
      return `<div class="task-item">${this.taskText}</div>`;
    }
  
    getElement() {
      const element = document.createElement('div');
      element.innerHTML = this.getTemplate();
      return element.firstElementChild;
    }
  }
  
