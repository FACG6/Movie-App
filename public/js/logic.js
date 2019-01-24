// general request function
function fetch({method,url,callback}) {
  console.log(url);
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = xhr.responseText;
        callback(response);
      }
      else{
        const error = `Error, status is ${xhr.status}`
        callback(error);
      }
    }
  };
  xhr.open(method, url);
  xhr.send();
}

function getMoviesData(response, callback) {
  let data = JSON.parse(response).results.map(movie => {
    return {
      id: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      overview: movie.overview,
      voteAverage: movie.vote_average,
      releaseDate: movie.release_date
    };
  });
  callback(data);
}

function getSimilarMoviesData(response, callback) {
  let allSimilarMovies = JSON.parse(response).results.filter((movie, index) => index < 5);
  allSimilarMovies = allSimilarMovies.map(similarMovie => {
    return {
      title: similarMovie.original_title,
      posterPath: similarMovie.poster_path
    };
  });
  callback(allSimilarMovies);
}

function getSimilarMovies(movieId, callback) {
  let url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${
    config.MY_KEY
  }`;
  fetch({
    method: "GET",
    url: url,
    query: "",
    callback: callback
  });
}

if (typeof module !== "undefined") {
  module.exports = {
    fetch,
    getMoviesData,
    getSimilarMovies,
    getSimilarMoviesData
  };
}