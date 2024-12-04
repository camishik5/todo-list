const model = {
    movies: [
        { id: 1, title: "Железный человек", watched: true },
        { id: 2, title: "Субстанция", watched: false }
    ],

    addMovie(movie) {
        const newId = this.movies.length ? this.movies[this.movies.length - 1].id + 1 : 1;
        const newMovie = { id: newId, ...movie };
        this.movies.push(newMovie);
        console.log("Фильм добавлен:", newMovie);
    },

    deleteMovie(id) {
        this.movies = this.movies.filter(movie => movie.id !== id);
        console.log(`Фильм с id ${id} удален`);
    },

    editMovie(id, updatedMovie) {
        const index = this.movies.findIndex(movie => movie.id === id);
        if (index !== -1) {
            this.movies[index] = { id, ...updatedMovie };
            console.log(`Фильм с id ${id} обновлен:`, this.movies[index]);
        }
    },

    toggleWatched(id) {
        const movie = this.movies.find(movie => movie.id === id);
        if (movie) {
            movie.watched = !movie.watched;
            console.log(`Статус фильма с id ${id} изменен:`, movie);
        }
    },

    getMovies() {
        console.log("Получение всех фильмов:", this.movies);
        return this.movies;
    },

    filterMovies(status) {
        let filteredMovies;
        if (status === "watched") {
            filteredMovies = this.movies.filter(movie => movie.watched);
        } else if (status === "unwatched") {
            filteredMovies = this.movies.filter(movie => !movie.watched);
        } else {
            filteredMovies = this.movies;
        }
        console.log(`Фильтрация фильмов по статусу "${status}":`, filteredMovies);
        return filteredMovies;
    }
};

export default model;
