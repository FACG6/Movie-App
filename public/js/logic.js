function fetch({ method, url, query, callback }) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      callback(response);
    }
  };
  xhr.open(method, url + query);
  xhr.send();
}

// This function returns an array of all movie details stored in objects //

function getMoviesData(response) {
    const allMovies = response.results;
    const moviesData = results.map(movie =>{
        return {
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        overview: movie.overview,
        voteAverage: movie.vote_average,
        releaseDate: movie.release_date,
        genre: getGenre(movie.genre_ids),
        }
    });

}

function getGenre(movieId) {
  let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
    config.MY_KEY
  }`;
  return ["genre1", "genre2"];
}

if (typeof module !== "undefined") {
  module.exports = { fetch, getMoviesData };
}
