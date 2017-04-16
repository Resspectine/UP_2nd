var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('diskdb');
app.use(express.static('public'));
app.use(bodyParser.json());
db.connect('private', ['articles', 'deletedArticles']);

app.get('/news', function (req, res) {
    res.json(db.articles.find());
    console.log("News send");
});

app.get('/deletedNews', function(req,res){
    res.json(db.deletedArticles.find());
    console.log("Deleted send");
});

app.post('/news', function (req, res) {
    console.log("POST");
    db.articles.remove();
    db.loadCollections(['articles']);
    db.articles.save(req.body);

});

app.path('/news/', function (req, res) {
    var index = req.body.Id;
    var query = db.articles.findOne({Id: index.toString()});
    console.log(query);
    console.log(req.body);
    var options = {
        multi: false,
        upsert: false
    };
    db.articles.update(query, req.body, options);
    res.json(req.body);
});
app.get('/news/:id', function (req, res) {
    var article = db.articles.findOne({Id: req.params.id});
    console.log(article);
    res.json(article);
});
app.delete('/news/:id', function (req, res) {
    var id = req.params.id;
    var article = db.articles.findOne({Id: req.params.id});
    db.deletedArticles.save(article);
    db.articles.remove({Id: id});
    res.json({idWasRemoved: Number(id)});
});
app.put('/news/', function (req, res) {
    db.articles.save(req.body);
    res.json(req.body);
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});