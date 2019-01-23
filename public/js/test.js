let tape = require("tape");
let logic = require('./logic');

tape("testing getGenre() function", t => {
  t.equal(logic.getGenre(540), ['Action'], "pass");
  t.end();
});
