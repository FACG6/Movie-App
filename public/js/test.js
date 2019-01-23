let tape = require("tape");
let logic = require('./logic');

const url = "https://api.themoviedb.org/3/movie/339403/similar?api_key=6b4029e64c1862a24fbb74c05d0aace8"

tape("testing getGenre() function", t => {
  t.equal(logic.getGenre(540), ['Action'], "pass");
  t.end();
});
