import TaskBoardComponent from '../view/task-board.js';
import TasksListComponent from '../view/task-list-component.js';
import NoTasksComponent from '../view/no-tasks-component.js';
import ClearButtonComponent from '../view/clear-button.js'; // Импортируем компонент кнопки очистки
import TaskPresenter from './task-presenter.js';
import { render } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;
    #tasksBoardComponent = new TaskBoardComponent();
    #boardTasks = [];
    #taskPresenters = new Map();  // Карта для хранения презентеров задач

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;

        // Подписываемся на изменения модели
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
            tasksForStatus.forEach((task) => {
                const taskPresenter = new TaskPresenter({
                    taskContainer: tasksListComponent.element,
                    task: task,
                    onDelete: () => {
                        task.status = 'trash';  // Изменяем статус задачи на "Корзина"
                        this.#handleModelChange();  // Перерисовываем доску после изменения
                    }
                });
                taskPresenter.init();
                taskPresenter.makeTaskDraggable();  // Добавляем возможность перетаскивания задач
                this.#taskPresenters.set(task.id, taskPresenter);  // Сохраняем презентер задачи
            });
        }
    }

    // Метод для рендеринга задач из "Корзины"
    renderTrashList(tasksForTrash, trashContainer) {
        if (tasksForTrash.length === 0) {
            trashContainer.innerHTML = '<div>Корзина пуста</div>';
        } else {
            tasksForTrash.forEach((task) => {
                const taskElement = document.createElement('div');
                taskElement.classList.add('task');
                taskElement.textContent = task.title;
                trashContainer.appendChild(taskElement);
            });
        }
    }

    #clearTrash() {
        this.#boardTasks = this.#boardTasks.filter(task => task.status !== 'trash');  // Удаляем задачи только из "Корзины"
    }

    #renderBoard() {
        render(this.#tasksBoardComponent, this.#boardContainer);

        // Рендерим кнопку "Очистить корзину"
        const clearButtonComponent = new ClearButtonComponent();
        render(clearButtonComponent, this.#boardContainer);

        // Добавляем обработчик события на кнопку
        clearButtonComponent.getElement().addEventListener('click', () => {
            this.#clearTrash();  // Очищаем задачи в "Корзине"
            this.#renderBoard();  // Перерисовываем доску
        });

        // Рендерим задачи по статусам, кроме "Корзины"
        Object.values(Status).forEach((status) => {
            const tasksListComponent = new TasksListComponent({
                status: status,
                label: StatusLabel[status],
                onTaskDrop: this.#handleTaskDrop.bind(this)
            });
            render(tasksListComponent, this.#tasksBoardComponent.element);

            const tasksForStatus = this.#getTasksByStatus(this.#boardTasks, status);
            this.renderTasksList(tasksForStatus, tasksListComponent);
        });

        // Рендерим колонку "Корзина"
        const trashColumn = document.getElementById('trash-column');
        const tasksForTrash = this.#getTasksByStatus(this.#boardTasks, 'trash');
        this.renderTrashList(tasksForTrash, trashColumn);
    }

    #handleModelChange() {
        this.#clearBoard();  // Очищаем доску
        this.#renderBoard();  // Перерисовываем доску с новыми задачами
    }

    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';  // Очищаем содержимое доски
    }

    #handleTaskDrop(taskId, newStatus) {
        console.log(`Task ${taskId} dropped with status ${newStatus}`); // Для отладки
        this.#tasksModel.updateTaskStatus(taskId, newStatus);  // Обновляем статус задачи
    }
}
