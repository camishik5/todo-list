import TaskBoard from '../view/task-board.js'; // Импорт компонента доски задач
import TasksListComponent from '../view/task-list.js';
import TaskComponent from '../view/task.js';
import { render } from '../framework/render.js';

export default class TasksBoardPresenter {
    constructor({ boardContainer, tasksModel }) {
        this.boardContainer = boardContainer;
        this.tasksModel = tasksModel;
        this.tasksBoardComponent = new TaskBoard(); // Создаем экземпляр доски задач
    }

    init() {
        // Рендер доски задач
        render(this.tasksBoardComponent, this.boardContainer);

        // Получаем задачи из модели
        this.boardTasks = [...this.tasksModel.getTasks()];

        // Разделяем задачи по статусам и отрисовываем списки
        const taskGroups = {
            backlog: [],
            processing: [],
            done: [],
            basket: [],
        };

        this.boardTasks.forEach(task => {
            taskGroups[task.status].push(task);
        });

        Object.keys(taskGroups).forEach(status => {
            const tasksListComponent = new TasksListComponent(status);
            render(tasksListComponent, this.tasksBoardComponent.getElement());

            taskGroups[status].forEach(task => {
                const taskComponent = new TaskComponent({ task });
                render(taskComponent, tasksListComponent.getElement());
            });
        });
    }
}
