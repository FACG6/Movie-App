// let logic = require("./logic.js");
const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${config.MY_KEY}&language=en-US&query=`;
const imagesUrl = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";
const searchForm = document.querySelector(".search_form");
const searchInput = document.querySelector(".search_input");
const container = document.querySelector(".container");
const moviesList = document.querySelector(".movies-list");

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
    url: `${apiUrl}${query}`,
    callback: res => getMoviesData(res, renderSearchResults)
  });
});

function renderSearchResults(results) {
  while (moviesList.firstChild) moviesList.removeChild(moviesList.firstChild);
  if (results.length == 0) {
    const noResult = document.createElement("li");
    noResult.textContent = "There are no movies with the name you entered";
    moviesList.appendChild(noResult);
    return;
  }
  results.forEach(movie => {
    const movieItem = document.createElement("li");
    const movieTitle = document.createElement("span");
    const moviePoster = document.createElement("img");

    //Add Classes to Elements
    movieItem.classList.add("movieData");
    movieTitle.classList.add("movie_title");
    moviePoster.classList.add("movie-poster");

    //Entering Content to Elements
    movieTitle.textContent = `${movie.title}(${movie.releaseDate})`;
    moviePoster.src = `${imagesUrl}${movie.posterPath}`;

    //popup eventlistener
    movieItem.addEventListener("click", event => {
      const popupContainer = document.querySelector(".popup-container");
      popupContainer.classList.add("popup-container-onclick");
      const popupClose = document.querySelector(".close-popup");
      popupClose.addEventListener("click", event => {
        while (popupContent.firstChild)
          popupContent.removeChild(popupContent.firstChild);
        popupContainer.classList.remove("popup-container-onclick");
      });

      //Create Elements
      const imgDiv = document.createElement("div");
      const contentDiv = document.createElement("div");
      const popupContent = document.querySelector(".popup-content");
      const movieTitle = document.createElement("h2");
      const moviePoster = document.createElement("img");
      const movieDate = document.createElement("h4");
      const movieDescription = document.createElement("p");
      const similarsDiv = document.createElement("div");

      //Enter Data
      movieTitle.textContent = movie.title;
      moviePoster.src = imagesUrl + movie.posterPath;
      movieDate.textContent = movie.releaseDate;
      movieDescription.textContent = movie.overview;

      //Add Classes
      imgDiv.classList.add("popup-image-div");
      contentDiv.classList.add("content-div");
      moviePoster.classList.add("popup-movie-poster");
      similarsDiv.classList.add("similars-div");

      //Redering similar Movies.
      getSimilarMovies(movie.id, response =>
        getSimilarMoviesData(response, renderSimilars)
      );

      //Redndering Function
      function renderSimilars(similars) {
        similars.forEach(movie => {
          const moviePoster = document.createElement("img");
          const container = document.createElement("div");
          container.appendChild(moviePoster);
          const titleContainer = document.createElement("div");
          const movieTitle = document.createElement("span");
          titleContainer.appendChild(movieTitle);
          container.appendChild(titleContainer);

          //Add Classes
          moviePoster.classList.add("pointer-poster");
          container.classList.add("movieContainer");

          //Add content
          movieTitle.textContent = `${movie.title} (${movie.releaseDate})`;
          
          //Event Listener to Similar Movies
          moviePoster.addEventListener("click", function (e) {
            while (popupContent.firstChild)
              popupContent.removeChild(popupContent.firstChild);
            popupContainer.classList.remove("popup-container-onclick");
            fetch({
              method: "GET",
              url: `${apiUrl}${movie.title}`,
              callback: res => getMoviesData(res, renderSearchResults)
            });
          });
          moviePoster.src = imagesUrl + movie.posterPath;
          similarsDiv.appendChild(moviePoster);
        });
      }
      const similarsHeading = document.createElement("h2");
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