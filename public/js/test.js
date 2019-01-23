let tape = require("tape");
let logic = require('./logic');
tape("testing getMovies() function", (t) => {
	const response = {
		results: [{
			id: 339403,
			title: "Baby Driver",
			posterPath: "/rmnQ9jKW72bHu8uKlMjPIb2VLMI.jpg",
			overview: "After being coerced into working for a crime boss, a young getaway driver finds himself taking part in a heist doomed to fail.",
			voteAverage: 7.4,
			releaseDate: "2017-06-28"
		}]
	}
	const actual = logic.getMoviesData(response);
	const expected = [{
		id: 339403,
		title: "Baby Driver",
		posterPath: "/rmnQ9jKW72bHu8uKlMjPIb2VLMI.jpg",
		overview: "After being coerced into working for a crime boss, a young getaway driver finds himself taking part in a heist doomed to fail.",
		voteAverage: 7.4,
		releaseDate: "2017-06-28"
	}]
	t.deepEqual(actual, expected, 'should return an object of the movie info');
	t.end();
})
tape("testing getSimilarMoviesData() function", (t) => {
	const response = {
		results: [{
			original_title: "Baby Driver",
			poster_path: "/rmnQ9jKW72bHu8uKlMjPIb2VLMI.jpg",
		}]
	}
	const actual = logic.getSimilarMoviesData(response);
	const expected = [{
		title: "Baby Driver",
		image: "/rmnQ9jKW72bHu8uKlMjPIb2VLMI.jpg",
	}]
	t.deepEqual(actual, expected, 'should return an object of the movie info');
	t.end();
})