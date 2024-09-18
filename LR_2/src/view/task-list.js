export default class TaskList {
    getTemplate() {
      return `
        <div class="task-list">
          <h2 class="task-list-title">Название блока</h2>
        </div>`;
    }
  
    getElement() {
      const element = document.createElement('div');
      element.innerHTML = this.getTemplate();
      return element.firstElementChild;
    }
  }
  
