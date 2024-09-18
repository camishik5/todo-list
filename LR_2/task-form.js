export default class TaskForm {
  getTemplate() {
    return `
      <div class="task-form">
        <input type="text" placeholder="Введите задачу" class="task-input">
        <button class="add-task-button">Добавить</button>
      </div>
    `;
  }

  getElement() {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
    return element.firstElementChild;
  }
}
