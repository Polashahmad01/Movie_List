// Movie constructor
function Movie(name, producer, release) {
    this.name = name;
    this.producer = producer;
    this.release = release;
}


// UI constructor
function UI() { }

// AddMovieToMovieList
UI.prototype.addMovieToMovieList = function (movie) {

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


// Show Alert
UI.prototype.showAlert = function (message, className) {

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

// Clear All UI Input Values
UI.prototype.clearAllInputValues = function () {

    document.querySelector('#name').value = '';
    document.querySelector('#producer').value = '';
    document.querySelector('#release').value = '';
}

// Delete Movie
UI.prototype.deleteMovie = function (target) {

    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
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

        // Show Movie Added
        ui.showAlert('Movie Added!', 'success')

        // Clear All Input values
        ui.clearAllInputValues();
    }



    e.preventDefault();
})


// Listen to delete movie event
document.querySelector('.tble-body').addEventListener('click', function (e) {


    // Create New UI
    const ui = new UI();

    // Delete movie
    ui.deleteMovie(e.target);

    // Show Alert
    ui.showAlert('Movie Deleted', 'success');

    e.preventDefault();
})