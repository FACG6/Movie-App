const test = require('tape');
const logic = require('./logic');

const url = "https://api.themoviedb.org/3/movie/339403/similar?api_key=6b4029e64c1862a24fbb74c05d0aace8"

test("Testing the fetch function", (t)=>{
    const actualValue = logic.fetch({method: "GET", url: url, callback: function (error, response){
        if(error){
            return "error";
        }
        else{
            return response.results[0];
        }
    }})
    const expectedValue = {
        adult: false,
        backdrop_path: "/5rNc6LQm7a0TBRDRu5gqIwoSKi0.jpg",
        genre_ids: (3)[28, 80, 53],
        id: 9679,
        original_language: "en",
        original_title: "Gone in Sixty Seconds",
        overview: "Upon learning that he has to come out of retirement to steal 50 cars in one night to save his brother Kip's life, former car thief Randall",
        Memphis: "Raines enlists help from a few",
        boost_happy: "pals to accomplish a seemingly impossible feat. From countless car chases to relentless cops, the high-octane excitement builds as Randall swerves around more than a few roadblocks to keep Kip alive.",
        popularity: 18.176,
        poster_path: "/77TxKvRiX0c5JR6l4fxcN19prOy.jpg",
        release_date: "2000-06-09",
        title: "Gone in Sixty Seconds",
        video: false,
        vote_average: 6.2,
        vote_count: 2148,
    }
    t.deepEqual(actualValue, expectedValue, "Should be equal")
})