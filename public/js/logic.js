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

function getMoviesData(response) {
  return [
    {
      id: "",
      title: "",
      posterPath: "",
      overview: "",
      voteAverage: "",
      releaseDate: ""
    }
  ];
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
  let url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=6b4029e64c1862a24fbb74c05d0aace8`;
  fetch({
    method: "GET",
    url: url,
    callback: callback(getSimilarMoviesData(response))
  });
}

if (typeof module !== "undefined") {
  module.exports = { fetch, getMoviesData, getGenre };
}
