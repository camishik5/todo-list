import { generateUniqueId } from "../utils.js";
import { Status } from "../const.js";

export default class TaskPresenter {
  #tasksModel = null;

  constructor({ tasksModel }) {
    this.#tasksModel = tasksModel;
  }

  get tasks() {
    return this.#tasksModel.tasks;
  }

  addNewTask(taskTitle) {
    const taskId = generateUniqueId(this.tasks);
    const taskNew = {
      id: taskId,
      title: taskTitle,
      status: Status.BACKLOG,
    };
    this.#tasksModel.addTask(taskNew);
  };
  
  getTasksByStatus(status) {
    return this.tasks.filter((task) => task.status === status);
  }

}