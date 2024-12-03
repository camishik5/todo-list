import model from './model.js';
import view from './view.js';
import presenter from './presenter.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("Инициализация приложения");
    console.log("Модель:", model);
    console.log("Представление:", view);
    console.log("Презентер:", presenter);
    presenter.init();
});
