import HeaderComponent from './view/header-component.js';
import AddTaskForm from './view/add-task-form.js';
import TaskBoard from './view/task-board.js';
import TaskList from './view/task-list.js';
import Task from './view/task.js';
import { render, RenderPosition } from './render.js';

// Получаем контейнер для отрисовки компонентов
const bodyContainer = document.querySelector('.board-app');

// Отрисовываем заголовок
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);

// Отрисовываем форму добавления задачи
const addTaskForm = new AddTaskForm();
render(addTaskForm, bodyContainer.querySelector('.add-task'), RenderPosition.BEFOREEND);

// Отрисовываем доску задач
const taskBoard = new TaskBoard();
render(taskBoard, bodyContainer.querySelector('.taskboard'), RenderPosition.BEFOREEND);

// Отрисовываем 4 списка задач
for (let i = 0; i < 4; i++) {
  const taskList = new TaskList(`Список задач ${i + 1}`);
  const taskListElement = taskList.getElement();
  
  // Отрисовываем 4 задачи в каждом списке
  for (let j = 0; j < 4; j++) {
    const task = new Task(`Задача ${j + 1} для списка ${i + 1}`);
    render(task, taskListElement.querySelector('.task-list'), RenderPosition.BEFOREEND);
  }

  // Добавляем список задач в доску
  render(taskListElement, taskBoard.getElement(), RenderPosition.BEFOREEND);
}
