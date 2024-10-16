import TaskComponent from '../view/task-component.js';
import { render } from '../framework/render.js';
import { generateUniqueId } from '../utils.js'; // Импорт функции для генерации ID

export default class TaskPresenter {
    #taskContainer = null;
    #task = null;

    constructor({ taskContainer, task }) {
        this.#taskContainer = taskContainer;
        this.#task = {
            ...task,
            id: generateUniqueId(),  // Генерация уникального ID
        };

        console.log(this.#task.id);  // Правильный способ вывести приватное свойство в консоль
    }

    init() {
        this.#renderTask();
    }

    #renderTask() {
        const taskComponent = new TaskComponent({ task: this.#task });
        render(taskComponent, this.#taskContainer);
    }
}
