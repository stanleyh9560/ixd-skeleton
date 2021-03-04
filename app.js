
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var create = require('./routes/create');
var reviewCreate = require('./routes/reviewCreate');
var yourRecipes = require('./routes/yourRecipes');
var find = require('./routes/find');
var login = require('./routes/login');
var recipe = require('./routes/recipe');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/index', index.view);
app.get('/create', create.view);
app.get('/reviewCreate', reviewCreate.view);
app.get('/yourRecipes', yourRecipes.view);
app.get('/find', find.view);
app.get('/',login.view);
app.get('/recipe/:name', recipe.view);
app.post('/createRecipe', create.createRecipe);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
