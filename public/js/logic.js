// general request function
function fetch({ method, url, query, callback}) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        callback(response);
      }
    }
  };
  xhr.open(method, url + query);
  xhr.send();
}

// // The user will searThe user will search for a movie, a request will be sent, and a callbackch for a movie, a request will be sent, and a callback
// function getRequest(url, query, callback) {
//   const url = url + query;

//   fetch({
//     method: "GET",
//     url: url,
//     callback: (error, result) => {
//       if (error) return "Error";
//       else callback(getMoviesData(result));
//     }
//   });
// }
// This function returns an array of the movie details, stored in objects //
function getMoviesData(response, callback) {
  const allMovies = response.results;
  let data = allMovies.map(movie => {
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

function getSimilarMoviesData(response) {
  const allSimilarMovies = response.results;
  return allSimilarMovies.map(similarMovie => {
    return {
      title: similarMovie.original_title,
      image: poster_path
    };
  });
}

function getSimilarMovies(movieId, callback) {
  let url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${
    config.MY_KEY
  }`;
  fetch({
    method: "GET",
    url: url,
    callback: callback(getSimilarMoviesData(response))
  });
}

if (typeof module !== "undefined") {
  module.exports = {
    fetch,
    getRequest,
    getMoviesData,
    getSimilarMovies,
    getSimilarMoviesDatas
  };
}
