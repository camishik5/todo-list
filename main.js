import HeaderComponent from './view/header-component.js';
import TaskForm from './view/task-form.js';
import TaskBoard from './view/task-board.js';
import TaskList from './view/task-list.js';
import Task from './view/task.js';
import { render, RenderPosition } from './framework/render.js';

// Получаем контейнеры для рендеринга
const headerContainer = document.querySelector('.todo-header');
const taskBoardContainer = document.querySelector('.taskboard');
const addTaskContainer = document.querySelector('.add-task');

// Проверяем наличие контейнеров
if (!headerContainer || !taskBoardContainer || !addTaskContainer) {
    console.error('One or more containers not found!');
}

// Создаем и рендерим компоненты
const headerComponent = new HeaderComponent();
render(headerComponent, headerContainer, RenderPosition.BEFOREEND);

const taskFormComponent = new TaskForm();
render(taskFormComponent, addTaskContainer);

const taskBoardComponent = new TaskBoard();
render(taskBoardComponent, taskBoardContainer);

// Определяем список задач (массив массивов для разных списков)
const taskLists = [
  ['Выучить JS', 'Выучить React', 'Сделать домашку'],
  ['Вымыть посуду', 'Полить цветы'],
  ['Позвонить маме', 'Покормить кота'],
  ['Сходить погулять', 'Прочитать "Войну и Мир"']
];

// Добавим лог для отладки
console.log('taskLists:', taskLists);

// Рендерим списки задач (блоки со списками задач)
taskLists.forEach((tasks, index) => {
  const taskListComponent = new TaskList();  // Создаем компонент для списка задач
  console.log('Rendering Task List:', index, tasks); // Логирование
  render(taskListComponent, taskBoardComponent.getElement(), RenderPosition.BEFOREEND);

  tasks.forEach(taskText => {
    const taskComponent = new Task(taskText);  // Создаем компонент для отдельной задачи
    console.log('Rendering Task:', taskText); // Логирование задачи
    render(taskComponent, taskListComponent.getElement(), RenderPosition.BEFOREEND);
  });
});
