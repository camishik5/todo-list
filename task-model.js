// src/model/task-model.js
import { tasks } from '../mock/task.js';

export default class TasksModel {
    constructor() {
        this.boardTasks = tasks; // Инициализация задач
    }

    getTasks() {
        return this.boardTasks; // Метод для получения задач
    }
}
