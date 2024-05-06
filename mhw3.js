document.addEventListener('DOMContentLoaded', function () {
    const locandina = document.getElementById('locandina3');
    const frecciaSinistra = document.getElementById('freccia_sinistra');
    const frecciaDestra = document.getElementById('freccia_destra');
    const images = [
        'images/img5.png',
        'images/img1.jpg',
        'images/img4.jpg',
        'images/img2.jpg',

    ];
    let currentImageIndex = 0;



    function updateImage() {
        locandina.src = images[currentImageIndex];
    }


    function showPreviousImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateImage();
    }


    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage();
    }

    frecciaSinistra.addEventListener('click', showPreviousImage);

    frecciaDestra.addEventListener('click', showNextImage);


    updateImage();
});

const hamMenu = document.querySelector(".hambuger-menu");
const menuHidden = document.querySelector(".menu-comparsa");
console.log(hamMenu);
hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle("active");
    menuHidden.classList.toggle("active");
}
)



const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');


async function loadMovies(searchTerm) {
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=f5673b96`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if (data.Response == "True") displayMovieList(data.Search);
}

function findMovies() {
    let searchTerm = (movieSearchBox.value).trim();
    if (searchTerm.length > 0) {
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies) {
    searchList.innerHTML = "";
    for (let idx = 0; idx < movies.length; idx++) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; 
        movieListItem.classList.add('search-list-item');
        if (movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else
            moviePoster = "images/image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details) {
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "images/image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
}


window.addEventListener('click', (event) => {
    if (event.target.className != "form-control") {
        searchList.classList.add('hide-search-list');
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const hambugerMenu = document.querySelector(".hambuger-menu");
    const body = document.querySelector("body");

    hambugerMenu.addEventListener("click", function () {
        body.classList.toggle("menu-active");
    });
});

  

class RandomUser {
    constructor() { }

    static fetchFromAPI() {
        let URL = 'https://randomuser.me/api/';
        fetch(URL)
            .then(response => response.json())
            .then(data => RandomUser.renderUserData(data))
            .catch(error => alert(error));
    }

    static renderUserData(data) {
        // console.log(data);
        let user = data.results[0];
        let cardElem = document.querySelector('.card');
        cardElem.innerHTML = `
        <div class = "card-head">
            <a href = "mailto:${user.email}"><i class = "fas fa-envelope"></i> Email</a>
            <div class = "user-image">
                <img src = "${user.picture.large}" alt = "">
            </div>
        </div>

        <div class = "card-body">
            <div class = "user-post-address">
                <div>
                    <span>${user.location.street.number}</span><span>Street Address</span>
                </div>
                <div>
                    <span>${user.location.postcode}</span><span>Postcode</span>
                </div>
                <div>
                    <span>${user.location.street.name}</span><span>Street Name</span>
                </div>
            </div>

            <div class = "user-name">
                <span class = "user-name-title">${user.name.title}.</span>
                <span class = "user-name-full">${user.name.first} ${user.name.last},</span>
                <span class = "user-age">${user.dob.age}</span>
            </div>

            <div class = "user-location-address">
                <span>${user.location.city}, ${user.location.state}, ${user.location.country}</span>
            </div>
        </div>

        <div class = "card-foot">
            <div class = "user-contact-info">
                <span>
                    <i class = "fas fa-phone"></i> ${user.phone}
                </span>
                <span>
                    <i class = "fa-solid fa-mobile-button"></i> ${user.cell}
                </span>
            </div>
        </div>
        `;
    }
}


document.getElementById('generate-btn').addEventListener('click', () => {
    RandomUser.fetchFromAPI();
});

RandomUser.fetchFromAPI();