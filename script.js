import ApiService from './api-service.js';

const END_POINT = 'https://mockapi.io/projects/your_project_id'; // Вставь сюда URL проекта MockAPI
const apiService = new ApiService(END_POINT);

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const tasks = await apiService.getTasks();
        console.log('Задачи, загруженные из MockAPI:', tasks);
        // Выводим задачи в нужные колонки
        tasks.forEach(task => renderTask(task));
    } catch (error) {
        console.error('Ошибка при загрузке задач:', error);
    }
});

const addTaskBtn = document.getElementById('add-task-btn');
addTaskBtn.addEventListener('click', async () => {
    const taskInput = document.getElementById('task-input');
    const taskName = taskInput.value.trim();
    if (taskName) {
        const newTask = { title: taskName, status: 'backlog' };
        try {
            const addedTask = await apiService.addTask(newTask);
            console.log('Добавленная задача:', addedTask);
            renderTask(addedTask);
        } catch (error) {
            console.error('Ошибка при добавлении задачи:', error);
        }
    }
});

function renderTask(task) {
    const taskElement = document.createElement('div');
    taskElement.textContent = task.title;
    taskElement.classList.add('task');
    taskElement.dataset.id = task.id;

    if (task.status === 'backlog') {
        document.getElementById('backlog-column').appendChild(taskElement);
    } else if (task.status === 'in-progress') {
        document.getElementById('in-progress-column').appendChild(taskElement);
    } else if (task.status === 'done') {
        document.getElementById('done-column').appendChild(taskElement);
    }
}
