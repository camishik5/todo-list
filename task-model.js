import generateId from '../utils.js';

export default class TasksModel {
    #boardTasks = [];
    #observers = [];
    #tasksApiService = null;

    constructor({ tasksApiService }) {
        this.#tasksApiService = tasksApiService;
    }

    async init() {
        try {
            console.log("Инициализация: загрузка задач с API...");
            this.#boardTasks = await this.#tasksApiService.getTasks();
            console.log("Задачи, загруженные из MockAPI:", this.#boardTasks);
            this.#notifyObservers(); // Уведомляем наблюдателей после загрузки задач
        } catch (error) {
            console.error('Ошибка при загрузке задач:', error);
        }
    }

    get tasks() {
        return this.#boardTasks;
    }

    getTasksByStatus(status) {
        return this.#boardTasks.filter(task => task.status === status);
    }

    async addTask(title) {
        const newTask = { title, status: 'backlog', id: generateId() };
        console.log("Добавление задачи:", newTask);

        try {
            const addedTask = await this.#tasksApiService.addTask(newTask);
            console.log("Задача добавлена:", addedTask);
            this.#boardTasks.push(addedTask);
            this.#notifyObservers(); // Уведомляем наблюдателей после добавления задачи
            return addedTask;
        } catch (error) {
            console.error('Ошибка при добавлении задачи:', error);
        }
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter(obs => obs !== observer);
    }

    #notifyObservers() {
        this.#observers.forEach(observer => observer());
    }
}
