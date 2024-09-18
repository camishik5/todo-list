export default class HeaderComponent {
  getTemplate() {
    return `<h1 class="header-title">Список задач</h1>`;
  }

  getElement() {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
    return element.firstElementChild;
  }
}
