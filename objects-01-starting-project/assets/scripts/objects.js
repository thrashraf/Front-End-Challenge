//grab everything we need
const addMovieBtn       = document.getElementById('add-movie-btn');
const searchMovieBtn    = document.getElementById('search-btn');

const movies = [];

//functions
const addMovieHandler = () => {

    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    if (title.trim() == '' ||
        extraName.trim() == '' ||
        extraValue.trim() == ''
      ){
            return;
    }
    
    const newMovies = {

        info: {

            title, //* this is same like title: title,
            [extraName] : extraValue 
        },
        id: Math.random()
    };

    movies.push(newMovies);
    console.log(movies);
    renderMovie();
};

const renderMovie = (filterMovie = '') => {

    const movieList = document.getElementById('movie-list');


    if (movies.length === 0) {

        movieList.classList.remove('visible');
        return;
    } else {

        movieList.classList.add('visible');
    }

    movieList.innerHTML = '';

    const filteredMovie =  !filterMovie ?
         movies : 
         movies.filter(movie => movie.info.title.includes(filterMovie));

    

    filteredMovie.forEach((movie) => {

        const movieEl = document.createElement('li');
        let text = movie.info.title + ' - ';

        for (const key in movie.info) {

                if (key !== 'title') {

                    console.log(typeof key);//* key is string, so we need to compare key !== 'title'
                    text = text + `${key} : ${movie.info[key]}`;
                }    
            }
        
        movieEl.textContent = text;
        movieList.append(movieEl);
    });
};

const searchMovieHandler = () => {

    const filterMovie = document.getElementById('filter-title').value;
    renderMovie(filterMovie);
}


//addEventListener
addMovieBtn.addEventListener('click', addMovieHandler);
searchMovieBtn.addEventListener('click', searchMovieHandler);
