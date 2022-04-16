const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const cleanInput = () => {
    const cleInput = document.querySelectorAll('input');
    for(input of cleInput){
        input.value = '';
    }    
}

const renderMovies = (filter = '') => {
    const movieList = document.getElementById('movie-list');
    if(movies.length === 0){
        movieList.classList.remove('visible');
        return;
    }else{
        movieList.classList.add('visible');
    }
    movieList.innerHTML = '';

    const filteredMovie = !filter 
    ? movies
    : movies.filter(movie => movie.info.title.includes(filter));

    filteredMovie.forEach(movie => {
        const movieEl = document.createElement('li');
        const {info} = movie; // destructuring the object it means movie.info
        // const {title : movieTitle} = info; // it means info.title is equal to movieTitle 
        // const {getFormatedTitle} = movie;

        
        let text =movie.getFormatedTitle() + ' - ';
        for (const key in info){
            if(key !== 'title'){
                text = text + `${key} : ${info[key]}`;
            }
        };

        movieEl.textContent = text;
        movieList.append(movieEl);
    });
};

const addMovieHandler = () => {
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;


    if(title.trim() === '' || extraName.trim() === '' || extraValue.trim() === ''){
        return;
    }

    const newMovie = {
        info : {
            title,
            [extraName] : extraValue
        },

        id : Math.random(),
        getFormatedTitle(){
            return this.info.title.toUpperCase();
        }
    };
    movies.push(newMovie);
    renderMovies();
    cleanInput();
};

const searchMovieHandler = () => {
    const filterTerm = document.getElementById('filter-title').value;
    renderMovies(filterTerm);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);

