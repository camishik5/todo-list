import { tasks } from '../mock/task.js'; // Импортируем массив задач

export default class TasksModel {
    #boardtasks = tasks; // Приватное поле для хранения задач

    // Геттер для получения массива задач
    get tasks() {
        return this.#boardtasks;
    }
}
