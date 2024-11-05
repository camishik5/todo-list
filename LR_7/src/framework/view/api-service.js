export default class ApiService {
    constructor(endPoint) {
        this._endPoint = endPoint;
    }

    async getTasks() {
        console.log("Отправка запроса для получения задач...");
        const response = await this._load({ url: 'tasks' });
        return ApiService.parseResponse(response);
    }

    async addTask(task) {
        console.log("Отправка запроса для добавления задачи:", task);
        const response = await this._load({
            url: 'tasks',
            method: 'POST',
            body: JSON.stringify(task),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return ApiService.parseResponse(response);
    }

    async updateTask(taskId, updatedTask) {
        console.log(`Отправка запроса для обновления задачи с ID ${taskId}:`, updatedTask);
        const response = await this._load({
            url: `tasks/${taskId}`,
            method: 'PUT',
            body: JSON.stringify(updatedTask),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return ApiService.parseResponse(response);
    }

    async deleteTask(taskId) {
        console.log(`Отправка запроса для удаления задачи с ID ${taskId}`);
        const response = await this._load({
            url: `tasks/${taskId}`,
            method: 'DELETE',
        });
        return ApiService.parseResponse(response);
    }

    async _load({ url, method = 'GET', body = null, headers = new Headers() }) {
        try {
            const response = await fetch(`${this._endPoint}/${url}`, { method, body, headers });
            ApiService.checkStatus(response);
            return response;
        } catch (err) {
            ApiService.catchError(err);
        }
    }

    static parseResponse(response) {
        return response.json();
    }

    static checkStatus(response) {
        if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }
    }

    static catchError(err) {
        console.error('API Error:', err);
        throw err;
    }
}
