// let logic = require("./logic.js");

let apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${
  config.MY_KEY
}&language=en-US&query=`;
let imagesUrl = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";
let searchForm = document.querySelector(".search-form");
let searchInput = document.querySelector(".search-input");
let container = document.querySelector(".container");
let moviesList = document.querySelector(".movies-list");

searchForm.addEventListener("submit", event => {
  event.preventDefault();

  let query = searchInput.value;
  if (!query) {
    alert("Please Enter a valid movie name");
    return;
  }
  searchInput.value = "";
  fetch({
    method: "GET",
    url: apiUrl,
    query: query,
    callback: res => getMoviesData(res, renderSearchResults)
  });
});

function renderSearchResults(results) {
  while (moviesList.firstChild) moviesList.removeChild(moviesList.firstChild);
  if (results.length == 0) {
    let noResult = document.createElement("li");
    noResult.textContent = "There are no movies with the name you entered";
    moviesList.appendChild(noResult);
    return;
  }
  results.forEach(movie => {
    let movieItem = document.createElement("li");

    let movieTitle = document.createElement("span");
    movieTitle.textContent = movie.title + " " + `(${movie.releaseDate})`;

    let moviePoster = document.createElement("img");
    moviePoster.classList.add("movie-poster");
    moviePoster.src = imagesUrl + movie.posterPath;
    //popup eventlistener
    moviePoster.addEventListener("click", event => {
      let popupContainer = document.querySelector(".popup-container");
      popupContainer.classList.add("popup-container-onclick");

      let popupClose = document.querySelector(".close-popup");
      popupClose.addEventListener("click", event => {
        while (popupContent.firstChild)
          popupContent.removeChild(popupContent.firstChild);
        popupContainer.classList.remove("popup-container-onclick");
      });
      let imgDiv = document.createElement("div");
      imgDiv.classList.add("popup-image-div");
      let contentDiv = document.createElement("div");
      contentDiv.classList.add("content-div");
      let popupContent = document.querySelector(".popup-content");

      let movieTitle = document.createElement("h2");
      movieTitle.textContent = movie.title;

      let moviePoster = document.createElement("img");
      moviePoster.classList.add("popup-movie-poster");
      moviePoster.src = imagesUrl + movie.posterPath;

      let movieDate = document.createElement("h4");
      movieDate.textContent = movie.releaseDate;

      let movieDescription = document.createElement("p");
      movieDescription.textContent = movie.overview;

      let similarsDiv = document.createElement("div");
      similarsDiv.classList.add("similars-div");
      getSimilarMovies(movie.id, response =>
        getSimilarMoviesData(response, renderSimilars)
      );
      function renderSimilars(similars) {
        // similars = similars.results.filter((movie, index) => index < 5);
        // console.log(similars);
        similars.forEach(movie => {
          let moviePoster = document.createElement("img");
          moviePoster.classList.add("pointer-poster");
          moviePoster.addEventListener("click", function(e) {
            while (popupContent.firstChild)
              popupContent.removeChild(popupContent.firstChild);
            popupContainer.classList.remove("popup-container-onclick");
            fetch({
              method: "GET",
              url: apiUrl,
              query: movie.title,
              callback: res => getMoviesData(res, renderSearchResults)
            });
          });
          moviePoster.src = imagesUrl + movie.posterPath;
          moviePoster.style.width = "75px";
          moviePoster.style.height = "100px";
          similarsDiv.appendChild(moviePoster);
        });
      }

      let similarsHeading = document.createElement("h2");
      similarsHeading.textContent = "Similar Movies";

      imgDiv.appendChild(moviePoster);
      popupContent.appendChild(imgDiv);
      popupContent.appendChild(contentDiv);
      contentDiv.appendChild(movieTitle);
      contentDiv.appendChild(movieDate);
      contentDiv.appendChild(movieDescription);
      contentDiv.appendChild(similarsHeading);
      contentDiv.appendChild(similarsDiv);
    });

    movieItem.appendChild(moviePoster);
    movieItem.appendChild(movieTitle);
    moviesList.appendChild(movieItem);
  });
}
