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
      releaseDate: "",
      genre: getGenre(id),
    }
  ];
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
