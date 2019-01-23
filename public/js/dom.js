// let logic = require("./logic.js");
let apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${
  config.MY_KEY
}&language=en-US&query=`;
let imagesUrl = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";
let searchForm = document.querySelector(".search_form");
let searchInput = document.querySelector(".search_input");
let container = document.querySelector(".container");
let moviesList = document.querySelector(".movies-list");
searchForm.addEventListener("click", event => {
    event.preventDefault();
    let query = searchInput.value;
    searchInput.value = "";
    fetch({
        method: "GET",
        url: apiUrl,
        query: query,
        callback: res => getMoviesData(res, renderSearchResults)
    });
});
function renderSearchResults(results) {
    results.forEach(movie => {
        let movieItem = document.createElement("li");
        
        movieItem.classList.add("movieData");
        movieItem.addEventListener("click", event => {
            let popupContainer = document.querySelector(".popup-container");
            let popupClose = document.querySelector(".close-popup");
            let popupContent = document.querySelector(".popup-content");
            popupContainer.classList.add("popup-container-onclick");
            popupClose.addEventListener("click", event => {
                popupContent.innerHTML = "";
                popupContainer.classList.remove("popup-container-onclick");
            });
            let movieTitle = document.createElement("h2");
            movieTitle.classList.add("movie_title");
            movieTitle.textContent = movie.title;

            let moviePoster = document.createElement("img");
            moviePoster.src = imagesUrl + movie.posterPath;

            let movieDate = document.createElement("h4");
            movieDate.textContent = movie.releaseDate;

            let movieDescription = document.createElement("p");
            movieDescription.textContent = movie.overview;

            popupContent.appendChild(moviePoster);
            popupContent.appendChild(movieTitle);
            popupContent.appendChild(movieDate);
            popupContent.appendChild(movieDescription);
        });
        let container = document.createElement("div");
        container.classList.add("movieContainer");
        let moviePoster = document.createElement("img");
        container.appendChild(moviePoster);
        let titleContainer = document.createElement("div");
        let movieTitle = document.createElement("span");
        movieTitle.textContent = movie.title + " " + `(${movie.releaseDate})`;
        titleContainer.appendChild(movieTitle);
        container.appendChild(titleContainer);
        moviePoster.src = imagesUrl + movie.posterPath;
        movieItem.appendChild(moviePoster);
        movieItem.appendChild(container);
        moviesList.appendChild(movieItem);
    });
}