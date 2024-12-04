import model from './model.js';
import view from './view.js';

const presenter = {
    init() {
        console.log("Инициализация presenter");
        this.updateView();

        document.getElementById("movie-form").addEventListener("submit", (event) => {
            event.preventDefault();
            const newMovie = view.getFormData();
            if (newMovie && newMovie.title) {
                model.addMovie(newMovie);
                view.clearForm();
                this.updateView();
            }
        });

        document.getElementById("movie-list").addEventListener("click", (event) => {
            const id = Number(event.target.dataset.id);

            if (event.target.classList.contains("toggle-status-btn")) {
                model.toggleWatched(id);
                this.updateView();
            }

            if (event.target.classList.contains("delete-btn")) {
                model.deleteMovie(id);
                this.updateView();
            }

            if (event.target.classList.contains("edit-btn")) {
                const movie = model.getMovies().find(movie => movie.id === id);
                if (movie) {
                    view.fillForm(movie);
                }
            }
        });

        document.querySelectorAll('input[name="status-filter"]').forEach((radio) => {
            radio.addEventListener("change", () => {
                this.updateView();
            });
        });
    },

    updateView() {
        const selectedFilter = document.querySelector('input[name="status-filter"]:checked').value;
        const movies = model.filterMovies(selectedFilter);
        view.renderMovieList(movies);
        console.log(`Фильтрация по статусу "${selectedFilter}":`, movies);
    }
};

export default presenter;
