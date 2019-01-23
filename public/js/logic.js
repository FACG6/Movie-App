// general request function

function fetch({method, url, callback}) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4)
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        callback(null, response);
      }
    else {
      callback("error, not found");
    }
  };

  xhr.open(method, url);
  xhr.send();
}

// The user will search for a movie, a request will be sent, and a callback
// function getRequest(url, query, callback) {
//   const url = `https://api.themoviedb.org/3/search/movie?api_key=${
//   config.MY_KEY}&language=en-US&query=${query}`

//   fetch({
//     method: "GET",
//     url: url,
//     callback: (error, result) => {
//       if (error) return "Error"
//       else callback(getMoviesData(result));
//     }
//   })
// }

// This function returns an array of the movie details, stored in objects //
function getMoviesData(response) {
  const allMovies = response.results;
  return allMovies.map(movie => {
    return {
      id: movie.id,
      title: movie.title,
      posterPath: movie.posterPath,
      overview: movie.overview,
      voteAverage: movie.voteAverage,
      releaseDate: movie.releaseDate,
    }
  });
}

function getSimilarMoviesData(response) {
  const allSimilarMovies = response.results;
  return allSimilarMovies.map(similarMovie => {
    return {
      title: similarMovie.original_title,
      image: similarMovie.poster_path
    };
  });
}

function getSimilarMovies(movieId, callback) {
  let url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=6b4029e64c1862a24fbb74c05d0aace8`;
  fetch({
    method: "GET",
    url: url,
    callback: callback(getSimilarMoviesData(response))
  });
}




//This function returns similar movies





if (typeof module !== "undefined") {
  module.exports = {
    fetch,
    getMoviesData, getSimilarMoviesData
  };
}
