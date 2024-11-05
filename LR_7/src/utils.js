// utils.js

/**
 * Функция для генерации уникального идентификатора для задачи
 * @returns {string} Уникальный идентификатор задачи
 */
export function generateUniqueId() {
    return `task-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}
