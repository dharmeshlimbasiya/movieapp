// select elements from dom
const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSerchable = document.querySelector('#movies-serchable');
const moviesContainer = document.querySelector('#movies-container');


function movieSelection(movies) {
  return movies.map((movie) => {
       if (movie.poster_path) {
        return `<img 
            src= ${IMAGE_URL + movie.poster_path} 
            data-movie-id=${movie.id}
        />`;
       }
    })
}

function createMovieContainer(movies, title = ''){
     const movieElement = document.createElement('div');
     movieElement.setAttribute('class','movie');

     const movieTemplate = `
     <h2>${title}</h2>
     <section class="section">
        ${movieSelection(movies)}
    </section>
    <div class="content">
        <p id="content-close">X</p>
    </div>
    `;

    movieElement.innerHTML = movieTemplate;
    return movieElement;
}

function renderSearchMovies(data) {
    // data.results []
    movieSerchable.innerHTML = '';
    const movies = data.results;
    const movieBlock =  createMovieContainer(movies);
    movieSerchable.appendChild(movieBlock);
    console.log('Data: ', data);
}

function renderMovies(data) {
    // data.results []
  
    const movies = data.results;
    const movieBlock =  createMovieContainer(movies, this.title);
    moviesContainer.appendChild(movieBlock);
}


function handleError(error) {
    console.log('Error: ' ,error);
}

buttonElement.onclick = function(event){
    event.preventDefault();
    const value = inputElement.value;
    serchMovie(value);


    inputElement.value = '';
    console.log('Value: ',value);
}

function createIframe(video){
    const iframe = document.createElement('iframe');
    iframe.src = `https://youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;

    return iframe;
}


function createVideoTemplate(data, content){
    // TODO
    // display movie videos
    content.innerHTML = '<p id="content-close">X</p>';
    console.log('Videos: ',data);
    const videos = data.results;
    const length = videos.length > 4 ? 4 : videos.length;
    const iframeContainer = document.createElement('div');

    for (let i = 0; i < length; i++) {
        const video = videos[i]; // video
        const iframe = createIframe(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer);
                    
    }
}

// event delegation
document.onclick = function() {

    const target = event.target;

    if (target.tagName.toLowerCase() === 'img') {
        const movieId = target.dataset.movieId;
        console.log('Movie ID: ',movieId);
        const section = event.target.parentElement; // section
        const content = section.nextElementSibling; //content
        content.classList.add('content-display');

        const path = `/movie/${movieId}/videos`;
        const url = generateUrl(path);
        // fetch movie video
        fetch(url)
            .then((res) => res.json())
            .then((data) => createVideoTemplate(data, content))
            .catch((error) => {
                console.log('Error: ',error);
        });
    }

    if (target.id === 'content-close') {
        const content = target.parentElement;
        content.classList.remove('content-display');
    }
}

serchMovie('spiderman');

getUpcomingMovies();

getTopRatedMovies();

getPopulardMovies();