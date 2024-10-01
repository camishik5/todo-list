// src/main.js
import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksModel from './model/task-model.js'; // Импортируем модель
import ClearButtonComponent from './view/clear-button.js'; // Импортируем компонент кнопки очистки корзины
import { render, RenderPosition } from './framework/render.js';

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const tasksBoardContainer = document.querySelector('.taskboard');

// Создаем экземпляр модели задач
const tasksModel = new TasksModel();

// Создаем экземпляр презентера и передаем в него контейнер и модель
const tasksBoardPresenter = new TasksBoardPresenter({
    boardContainer: tasksBoardContainer,
    tasksModel, // Передаем модель в презентер
});

// Отрисовываем заголовок и форму добавления задачи
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer);

// Инициализируем презентер для отображения задач
tasksBoardPresenter.init();

// Отрисовываем кнопку очистки корзины
const clearButtonComponent = new ClearButtonComponent();
render(clearButtonComponent, tasksBoardContainer, RenderPosition.BEFOREEND); // Добавляем кнопку в конец доски задач
