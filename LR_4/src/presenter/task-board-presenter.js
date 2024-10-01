import TaskBoardComponent from '../view/task-board.js'; // Импорт компонента доски задач
import TasksListComponent from '../view/task-list-component.js'; // Импорт компонента списка задач
import TaskComponent from '../view/task-component.js'; // Импорт компонента задачи
import NoTasksComponent from '../view/no-tasks-component.js'; // Импорт компонента заглушки
import { render } from '../framework/render.js'; // Импорт функции render
import { Status, StatusLabel } from '../const.js'; // Импорт констант для статусов

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;
    #tasksBoardComponent = new TaskBoardComponent(); // Приватное поле для компонента доски задач
    #boardTasks = []; // Приватное поле для хранения задач

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.tasks];
        this.#renderBoard(); // Отрисовываем всю доску с задачами
    }

    // Приватный метод для фильтрации задач по статусу
    #getTasksByStatus(boardTasks, status) {
        return boardTasks.filter(task => task.status === status);
    }

    // Приватный метод для рендеринга задачи
    #renderTask(task, container) {
        const taskComponent = new TaskComponent({ task });
        render(taskComponent, container);
    }

    // Приватный метод для рендеринга всей доски
    #renderBoard() {
        render(this.#tasksBoardComponent, this.#boardContainer);

        Object.values(Status).forEach((status) => {
            const tasksListComponent = new TasksListComponent({ status: status, label: StatusLabel[status] });
            render(tasksListComponent, this.#tasksBoardComponent.element);

            const tasksForStatus = this.#getTasksByStatus(this.#boardTasks, status);

            // Проверка, есть ли задачи. Если нет, рендерим заглушку.
            if (tasksForStatus.length === 0) {
                render(new NoTasksComponent(), tasksListComponent.element); // Отображаем заглушку
            } else {
                tasksForStatus.forEach((task) => {
                    this.#renderTask(task, tasksListComponent.element);
                });
            }
        });
    }
}
