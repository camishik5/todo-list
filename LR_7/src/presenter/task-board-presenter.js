import TaskBoardComponent from '../view/task-board.js';
import TasksListComponent from '../view/task-list-component.js';
import NoTasksComponent from '../view/no-tasks-component.js';
import ClearButtonComponent from '../view/clear-button.js';
import TaskPresenter from './task-presenter.js';
import { render } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;
    #tasksBoardComponent = new TaskBoardComponent();
    #boardTasks = [];
    #taskPresenters = new Map();

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.tasks];
        this.#renderBoard();
    }

    #getTasksByStatus(boardTasks, status) {
        return boardTasks.filter(task => task.status === status);
    }

    renderTasksList(tasksForStatus, tasksListComponent) {
        if (tasksForStatus.length === 0) {
            render(new NoTasksComponent(), tasksListComponent.element);
        } else {
            tasksForStatus.forEach(task => {
                const taskPresenter = new TaskPresenter({
                    taskContainer: tasksListComponent.element,
                    task: task,
                    onDelete: () => {
                        task.status = 'trash';
                        this.#handleModelChange();
                    }
                });
                taskPresenter.init();
                this.#taskPresenters.set(task.id, taskPresenter);
            });
        }
    }

    renderTrashList(tasksForTrash, trashContainer) {
        if (tasksForTrash.length === 0) {
            trashContainer.innerHTML = '<div>Корзина пуста</div>';
        } else {
            tasksForTrash.forEach(task => {
                const taskElement = document.createElement('div');
                taskElement.classList.add('task');
                taskElement.textContent = task.title;
                trashContainer.appendChild(taskElement);
            });
        }
    }

    #clearTrash() {
        this.#boardTasks = this.#boardTasks.filter(task => task.status !== 'trash');
    }

    #renderBoard() {
        render(this.#tasksBoardComponent, this.#boardContainer);

        const clearButtonComponent = new ClearButtonComponent();
        render(clearButtonComponent, this.#boardContainer);

        clearButtonComponent.getElement().addEventListener('click', () => {
            this.#clearTrash();
            this.#renderBoard();
        });

        Object.values(Status).forEach(status => {
            const tasksListComponent = new TasksListComponent({
                status: status,
                label: StatusLabel[status],
                onTaskDrop: this.#handleTaskDrop.bind(this)
            });
            render(tasksListComponent, this.#tasksBoardComponent.element);

            const tasksForStatus = this.#getTasksByStatus(this.#boardTasks, status);
            this.renderTasksList(tasksForStatus, tasksListComponent);
        });

        const trashColumn = document.getElementById('trash-column');
        const tasksForTrash = this.#getTasksByStatus(this.#boardTasks, 'trash');
        this.renderTrashList(tasksForTrash, trashColumn);
    }

    #handleModelChange() {
        this.#clearBoard();
        this.#renderBoard();
    }

    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
    }

    #handleTaskDrop(taskId, newStatus) {
        this.#tasksModel.updateTaskStatus(taskId, newStatus);
    }
}
