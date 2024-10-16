export default class TasksModel {
    #boardTasks = [];
    #observers = [];

    constructor(tasks) {
        this.#boardTasks = tasks;
    }

    get tasks() {
        return this.#boardTasks;
    }

    getTasksByStatus(status) {
        return this.#boardTasks.filter(task => task.status === status);
    }

    addTask(title) {
        const newTask = {
            title,
            status: 'backlog',
            id: generateId(),
        };
        this.#boardTasks.push(newTask);
        this.#notifyObservers(); // Уведомляем всех наблюдателей об изменении
        return newTask;
    }

    updateTaskStatus(taskId, newStatus) {
        const task = this.#boardTasks.find(task => task.id === taskId);
        if (task) {
            task.status = newStatus;
            this.#notifyObservers(); // Уведомляем всех наблюдателей об изменении
        }
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter(obs => obs !== observer);
    }

    #notifyObservers() {
        this.#observers.forEach(observer => observer()); // Уведомляем всех наблюдателей
    }
}
