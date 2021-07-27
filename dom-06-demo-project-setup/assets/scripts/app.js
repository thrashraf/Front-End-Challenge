//grab everything we need
const addMovieBtn   = document.querySelector('[type=button]');
const modal         = document.querySelector('.modal');
const backdrop      = document.getElementById('backdrop');
const addBtn        = modal.querySelector('.btn--success');
const cancelMovieBtn= modal.querySelector('.btn--passive');
const userInput     = modal.querySelectorAll('input');
const section       = document.querySelector('section');
const list          = document.getElementById('movie-list');
const deleteCon     = document.getElementById('delete-modal');
const cancelBtn     = deleteCon.querySelector('.btn--passive');

let movies = [];
let deleteBtn     = document.querySelector('.btn--danger');


//functions
const addMovie = () => {

    backgroundOverlay(backdrop);
    backgroundOverlay(modal);
};

const renderMovie = (title, url, rating, id) => {

    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
      
        newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${url}" alt="${title}">
    </div>
    <div class="movie-element__info">
        <i class="fas fa-trash"></i>
        <h2>${title}</h2>
        <p>${rating}/5</p>
    </div>
    `;
    
 
    list.append(newMovieElement);
    newMovieElement.addEventListener('click', deleteMovie.bind(null, id));
    
};

const cancelMovieDeletion = () => {

    backgroundOverlay(backdrop);
    deleteCon.classList.remove('visible');
}

const deleteMovie = (movieId) => {

    deleteCon.classList.add('visible');
    backgroundOverlay(backdrop);

    deleteBtn.replaceWith(deleteBtn.cloneNode(true));
    deleteBtn = document.querySelector('.btn--danger');

    cancelMovieBtn.removeEventListener('click', cancelMovieDeletion);
    cancelBtn.addEventListener('click', cancelMovieDeletion);
    deleteBtn.addEventListener('click', deleteMovieHandler.bind(null, movieId));
    // deleteMovieHandler(movieId);


};

const deleteMovieHandler = (movieId) => {

    
    let movieIndex = 0;

    for (const movie of movies) {
        
        if(movie.id === movieId){

            break;
        }
        movieIndex++;
    }
    
    movies.splice(movieIndex, 1);
    list.children[movieIndex].remove();
    cancelMovieDeletion();
    clearSection();

}


const clearSection = () => {

    if(movies.length === 0){

        section.style.display = 'block';
    } else {

        section.style.display = 'none';
    }
    
};

const clearInput = () => {

    for (const input of userInput) {
        input.value = '';
    }
};

const backgroundOverlay = (target) => {

    target.classList.toggle('visible');
    clearInput();
};

const closeMovieModal = () => {

    modal.classList.remove('visible');
};

const showMovieModal = () => {

   modal.classList.add('visible');
   backgroundOverlay(backdrop);

}

const overlayHandler = () => {

    closeMovieModal();
    cancelMovieDeletion();
    clearInput();
};

const cancelAddMovie = () => {

    closeMovieModal();
    backgroundOverlay(backdrop);

};

const createMovie = () => {

    const movieTitle = userInput[0].value;
    const ImageUrl = userInput[1].value;
    const userRating = userInput[2].value;

    for (const input of userInput) {
        
        const movieDetail = input.value;

        if(movieDetail.length === 0 || +movieDetail < 1){

            alert('please enter a valid value & (movie rating must 1-5)');
            return;
        }    
    }


    const newMovie = {
        
        id: Math.random(),
        title:movieTitle,
        url:ImageUrl,
        rating:userRating,
    };
    
    movies.push(newMovie);
    closeMovieModal();
    backgroundOverlay(backdrop);
    clearInput();
    clearSection();
    renderMovie(newMovie.title, newMovie.url, newMovie.rating, newMovie.id);
    
};




//addEventListener
addMovieBtn.addEventListener('click', addMovie);
backdrop.addEventListener('click', overlayHandler);
cancelMovieBtn.addEventListener('click', cancelAddMovie);
addBtn.addEventListener('click', createMovie);
