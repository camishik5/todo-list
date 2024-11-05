import ApiService from './framework/view/api-service.js';
import TasksModel from './model/task-model.js';

document.addEventListener('DOMContentLoaded', async () => {
    const apiService = new ApiService('https://6721422098bbb4d93ca7f604.mockapi.io/tasks');
    const tasksModel = new TasksModel({ tasksApiService: apiService });

    await tasksModel.init();

    const addTaskButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const backlogColumn = document.getElementById('backlog-column');

    addTaskButton.addEventListener('click', async () => {
        const taskTitle = taskInput.value.trim();
        if (taskTitle) {
            await tasksModel.addTask(taskTitle);
            renderTasks(tasksModel.getTasksByStatus('backlog'), backlogColumn);
            taskInput.value = '';
        }
    });

    function renderTasks(tasks, container) {
        container.innerHTML = '';
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            taskElement.textContent = task.title;
            container.appendChild(taskElement);
        });
    }

    // Отображение задач при загрузке страницы
    renderTasks(tasksModel.getTasksByStatus('backlog'), backlogColumn);
});
