var choo = require('choo');
var view = require('./views');

var app = choo();

app.model(require('./model'));
app.router(function (route) {
  return [route('/', view)];
});

var tree = app.start();

document.body.appendChild(tree);
