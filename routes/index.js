var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', condition: true });
});*/


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to the tp6', condition: true, anyArray:[1,2,3] });
});





router.get('/test/:id', function(req,res,next){
  res.render('test',{output: req.params.id});
});

module.exports = router;
