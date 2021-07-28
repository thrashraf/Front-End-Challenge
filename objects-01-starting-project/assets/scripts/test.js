const addMovieBtn = document.getElementById('add-movie-btn');
const searchMovieBtn = document.getElementById('search-btn');

const movies = [];

const addMovieHandler = () => {

    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    if (title.trim() === '' ||
        extraName.trim() === '' || 
        extraValue.trim() ===''
        ){
            return;
    }

    const newMovie = {

        info: {

            title,
            [extraName] : extraValue
        },
        id: Math.random(),
        getFormatedTitle: function(){
            return this.info.title.toUpperCase();
        }
    };

    movies.push(newMovie);
    console.log(movies);
    renderMovie();
};


const renderMovie = (filter = '') => {

    const lists = document.getElementById('movie-list');

    if (movies.length === 0){

        lists.classList.remove('visible');
    } else {

        lists.classList.add('visible');
    }

    lists.innerHTML = '';

    const filteredMovie = !filter ? 
    movies : 
    movies.filter(movie => movie.info.title.includes(filter));



    filteredMovie.forEach((movie) => {

        const list = document.createElement('li');
        console.log(movie.hasOwnProperty('info')); //* this is how to check if property exist
        const {info} = movie; //* this is how to pull object into variable 
        console.log(info);

        let text = movie.getFormatedTitle() + ' - ';

        for (const key in info) {
            
            if (key !== 'title'){

                text = text +`${key} : ${info[key]}`;
            }
        }

        list.textContent = text;
        lists.append(list);

    });

};

const searchMovieHandler = () => {

    const filter = document.getElementById('filter-title').value;
    renderMovie(filter);
};


//addEventListener
addMovieBtn.addEventListener('click', addMovieHandler);
searchMovieBtn.addEventListener('click', searchMovieHandler);