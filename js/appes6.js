class Movie {
    constructor(name, producer, release) {
        this.name = name;
        this.producer = producer;
        this.release = release;
    }
}


class UI {

    addMovieToMovieList(movie) {

        // Get variables
        const list = document.querySelector('.tble-body');

        // Create row element
        const row = document.createElement('tr');

        // Add className 
        row.className = 'tble-row';

        // Add Html
        row.innerHTML = `
        <td class="tble-data">${movie.name}</td>
        <td class="tble-data">${movie.producer}</td>
        <td class="tble-data">${movie.release}</td>
        <td class="delete"><a href="#" class="delete" style="text-decoration: none", style="color: #fff">X</a></td>
    `;

        // Append row to list
        list.appendChild(row);
    }

    showAlert(message, className) {

        // Create div element
        const div = document.createElement('div');

        // Add className 
        div.className = `alert ${className}`;

        // Create text
        div.appendChild(document.createTextNode(message));

        // Get parent
        const parent = document.querySelector('.container');

        // Get H1
        const heading = document.querySelector('h1');

        // InsertBefore
        parent.insertBefore(div, heading);

        // Remove message after 3s 
        setTimeout(function () {
            document.querySelector('.alert').remove();

        }, 3000)
    }

    clearAllInputValues() {

        document.querySelector('#name').value = '';
        document.querySelector('#producer').value = '';
        document.querySelector('#release').value = '';
    }

    deleteMovie(target) {

        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
}


// Add Movie to localStorage
class Store {
    static getMovie() {
        let movies;
        if (localStorage.getItem('movies') === null) {
            movies = [];
        } else {
            movies = JSON.parse(localStorage.getItem('movies'));
        }

        return movies;
    }

    static displayMovie() {

        const movies = Store.getMovie();

        movies.forEach(function (movie) {

            const ui = new UI();

            ui.addMovieToMovieList(movie);
        })


    }

    static addMovie(movie) {
        const movies = Store.getMovie();

        movies.push(movie);

        localStorage.setItem('movies', JSON.stringify(movies));

    }

    static removeMovie(producer) {

        const movies = Store.getMovie();

        movies.forEach(function (movie, index) {
            if (movie.producer === producer) {
                movie.splice(index, 1);
            }
        });

        localStorage.setItem('moves', JSON.stringify(movies));

    }
}



// Listen to Add Movie Event
document.getElementById('movie-form').addEventListener('submit', function (e) {

    // Get All Input value
    const name = document.getElementById('name').value,
        producer = document.getElementById('producer').value,
        release = document.getElementById('release').value;

    // Create New Book
    const movie = new Movie(name, producer, release);


    // Create New UI
    const ui = new UI();

    if (name === '' || producer === '' || release === '') {

        // Show Error
        ui.showAlert('Please fill out all forms', 'error');

    } else {
        // Add Movie to Movie List
        ui.addMovieToMovieList(movie);

        // Add Moive to LS
        Store.addMovie(movie);

        // Show Movie Added
        ui.showAlert('Movie Added!', 'success')

        // Clear All Input values
        ui.clearAllInputValues();
    }



    e.preventDefault();
})

// Show List to ui
document.addEventListener('DOMContentLoaded', Store.displayMovie);

// Listen to delete movie event
document.querySelector('.tble-body').addEventListener('click', function (e) {


    // Create New UI
    const ui = new UI();

    // Delete movie
    ui.deleteMovie(e.target);

    // Remove from LS
    Store.removeMovie(e.target.parentElement.previousElementSibling.textContent);

    // Show Alert
    ui.showAlert('Movie Deleted', 'success');

    e.preventDefault();
})