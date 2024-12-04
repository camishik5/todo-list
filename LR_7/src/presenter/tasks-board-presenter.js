import ListTask from '../view/list-task-component.js';
import Task from '../view/task-component.js';
import ClearButton from '../view/clear-button.js';
import AreaTask from '../view/area-task-component.js';
import { render } from '../framework/render.js';
import { Status, StatusArray, UserAction } from '../const.js';
import TaskPresenter from './task-presenter.js';
import NoTaskComponent from '../view/task-no-component.js';
import LoaderComponent from '../view/loader-component.js';

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #taskPresenter = null;

  #loading = false;
  #loaderComponent = new LoaderComponent();
  #tasksBoardComponent = new AreaTask();
  #clearButtonComponent = null;

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#taskPresenter = new TaskPresenter({ tasksModel: this.#tasksModel });

    this.#tasksModel.addObserver(this.#handleEvent.bind(this));
  }

  async init() {
    this.#loading = true;
    this.#renderLoad();

    try {
      await this.#tasksModel.init();
      this.#loading = false;
      this.#clearLoad();
      this.#renderBoard();
      this.#renderTasksList();
      this.#renderBasketList();
    } catch (err) {
      console.error("Ошибка при инициализации:", err);
    }
  }

  async addNewTask(taskTitle) {
    if (!taskTitle) {
      return;
    }

    this.#loading = true;
    this.#renderLoad();

    try {
      await this.#tasksModel.addTask(taskTitle);
      document.querySelector(".new-task__input").value = "";
    } catch (err) {
      console.error("Ошибка при создании задачи:", err);
    } finally {
      this.#loading = false;
      this.#clearLoad();
    }
  }

  #handleEvent(event, payload) {
    console.log("Event triggered:", event, payload);
    switch (event) {
      case UserAction.ADD_TASK:
      case UserAction.UPDATE_TASK:
      case UserAction.DELETE_TASK:
      case UserAction.CLEAR_BASKET:
        this.#clearBoard();
        this.#renderTasksList();
        this.#renderBasketList(); 
        break;
    }
  };

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = "";
    this.#clearButtonComponent = null;
  }

  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);
  }

  #renderTasks(task, container) {
    const taskComponent = new Task({ task });
    render(taskComponent, container);
  }

  #renderTasksList() {
    const noStatusInBasket = StatusArray.filter(
      (status) => status !== Status.BASKET
    );

    for (const status of noStatusInBasket) {
      const listTask = new ListTask({
        status,
        onTaskDrop: this.#handleTaskDrop.bind(this),
      });

      listTask.element.setAttribute("data-status", status);
      render(listTask, this.#tasksBoardComponent.element);

      const tasksStatus = this.#taskPresenter.getTasksByStatus(status);

      const listElement = listTask.element.querySelector(".tasks__list");

      if (tasksStatus.length === 0) {
        const noTaskComponent = new NoTaskComponent();
        render(noTaskComponent, listElement);
      } else {
        for (const task of tasksStatus) {
          this.#renderTasks(task, listElement);
        }
      }
    }
  }

  async #handleTaskDrop(taskId, newStatus) {
    this.#loading = true;
    this.#renderLoad();
    try {
      await this.#tasksModel.updateTaskStatus(taskId, newStatus);
      this.#loading = false;
      this.#clearLoad();
    } catch (err) {
      console.error("Ошибка при обновлении статуса задачи:", err);
    }
  }

  #renderBasketList() {
    const status = Status.BASKET;
    const listTask = new ListTask({
      status,
      onTaskDrop: this.#handleTaskDrop.bind(this),
    });

    listTask.element.setAttribute("data-status", status);
    render(listTask, this.#tasksBoardComponent.element);

    const tasksStatus = this.#taskPresenter.getTasksByStatus(status);

    const listElement = listTask.element.querySelector(".tasks__list");

    if (tasksStatus.length === 0) {
      const noTaskComponent = new NoTaskComponent();
      render(noTaskComponent, listElement);
    } else {
      for (const task of tasksStatus) {
        this.#renderTasks(task, listElement);
      }
    }

    const isDisabled = tasksStatus.length === 0;
    this.#clearButtonComponent = new ClearButton(isDisabled);
    this.#clearButtonComponent.setClickHandler(this.#handleClearBasket);
    render(this.#clearButtonComponent, listTask.element);
  }

  #handleClearBasket = async () => {
    try {
      await this.#tasksModel.clearBasketTasks();
    } catch (err) {
      console.error("Ошибка при очистке корзины:", err);
    }
  };

  #renderLoad() {
    if (this.#loading) {
      render(this.#loaderComponent, this.#boardContainer);
    }
  }

  #clearLoad() {
    if (!this.#loading) {
      this.#loaderComponent.element.remove();
    }
  }
}
