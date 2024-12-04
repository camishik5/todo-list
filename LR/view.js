const view = {
    renderMovieList(movies) {
        const movieList = document.getElementById("movie-list");
        movieList.innerHTML = "";

        if (movies.length === 0) {
            movieList.innerHTML = "<p>Список фильмов пуст</p>";
            console.log("Список фильмов пуст.");
            return;
        }

        movies.forEach(movie => {
            const movieItem = document.createElement("div");
            movieItem.classList.add("movie-item");
            movieItem.innerHTML = `
                <strong>${movie.title}</strong> — ${movie.watched ? "Просмотрен" : "Не просмотрен"}
                <button data-id="${movie.id}" class="toggle-status-btn">Изменить статус</button>
                <button data-id="${movie.id}" class="edit-btn">Редактировать</button>
                <button data-id="${movie.id}" class="delete-btn">Удалить</button>
            `;
            movieList.appendChild(movieItem);
        });

        console.log("Отображены фильмы:", movies);
    },

    getFormData() {
        const title = document.getElementById("movie-title").value.trim();
        const watched = document.getElementById("movie-status").checked;

        if (!title) {
            alert("Введите название фильма!");
            console.warn("Название фильма не введено.");
            return null;
        }

        console.log("Получены данные из формы:", { title, watched });
        return { title, watched };
    },

    clearForm() {
        document.getElementById("movie-title").value = "";
        document.getElementById("movie-status").checked = false;
        console.log("Форма очищена.");
    },

    fillForm(movie) {
        document.getElementById("movie-title").value = movie.title;
        document.getElementById("movie-status").checked = movie.watched;
        console.log("Форма заполнена данными фильма:", movie);
    }
};

export default view;
