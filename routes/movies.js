var express = require('express');
var router = express.Router();
// Lodash utils library
const _ = require('lodash');
const data = require('../data.json');

var bodyParser = require('body-parser');
var app = express();
const fs = require ('fs');
const axios = require('axios');


const apiKey ='37e44ebf';
const API_link = `http://www.omdbapi.com/?apikey=${apiKey}&t=`;
const API_OSS_117 = 'http://www.omdbapi.com/?apikey=37e44ebf&t=oss+117';






function getTheMovie() {
    console.log('je suis dans getThemovie');
    // Make a request for a user with a given ID
    var isTheMovieInTheApi = false;

    axios.get('http://www.omdbapi.com/?apikey=37e44ebf&t=oekjfahwa')
        .then(function (response) {
            // handle success
            console.log(response+ ' pas de pb');
            isTheMovieInTheApi =true;
        })
        .catch(function (error) {
            // handle error
            console.log(error + ' pb');

        })
        .finally(function () {
            // always executed

        });
    console.log("ma variable vaut : " + isTheMovieInTheApi);
    return isTheMovieInTheApi;
}


function findTheMovie(title){
    axios.get(API_link+title)
         .then (function(response) {
            console.log(response);
    });
}










/* GET movies listing. ----------------------------------------------------------------------------------------- */
router.get('/', function(req, res, next) {
  /*res.send('respond with a resource yo');*/
//  res.status(200).json({movies});

    res.send(JSON.stringify(data)) //permet d'affcher les données issues du json
      // res.render('movies', { title: 'Cool, huh!'});
});

/* GET one movie by id ------------------------------------------------------------------------------------------- */
router.get('/:id', (req, res)=>{
    // Get id in params
    const {id}= req.params;
    //find movie in the database
    const movie = _.find(data,["id",id]);

    //return de le movie avec le message
    if(movie)
        res.send(JSON.stringify({
                message : 'Movie found :)',
                movie
            }));
    else res.send(JSON.stringify({
        message : 'Movie not found :(',
    }));
});




/* PUT new music from api into ddb  --------------------------------------------------------------------------*/
router.put('/',(req,res)=>{
    //Get the data from request from request
    const { moviee } =JSON.stringify(req.body);
    console.log(req.body.movie);
    console.log(`http://www.omdbapi.com/?apikey=${apiKey}&t=${req.body.movie}`);
    //Create new unique id
    let id = _.uniqueId();
    //Insert it in the ddb

    // on lit et on range les données présentes dans le fichier movie
    var jsonData = JSON.stringify(data);
// parse json
    var jsonObj = JSON.parse(jsonData);
    console.log(jsonObj);

    axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${req.body.movie}`)
        .then (function(response) {
            //console.log(response);
           /* if (response.data.Title==movie)*/{
                //newMovie rpz les valeurs à récupérer par le put

                var newMovie ={
                    "id": id,
                    "movie": JSON.stringify(response.data.Title)
                };
                var newMovie ={
                    "id": id,
                    "movie": response.data.Title,
                    "yearOfRelease": response.data.Released,
                    "duration": response.data.Runtime,
                    "actors": response.data.Actors,
                    "poster": response.data.Poster,
                    "boxOffice": response.data.BoxOffice,
                    "rottenTomatoesScore": response.data.Ratings[2].Value
                };
                console.log("/////////////////////////////////////////////////" + JSON.stringify(newMovie));

                jsonObj.push(newMovie);
                //on affihe dans la console
                console.log("just added " + JSON.stringify(response.data.Title) + " with the id : " + id);

                // stringify JSON Object
                var jsonContent = JSON.stringify(jsonObj);
                //console.log(jsonContent);
                fs.writeFile("data.json", jsonContent, 'utf8', function (err) {
                    if (err) {

                        //TODO: checker l'ennregistrement
                        console.log("An error occured while writing JSON Object to File.");
                        return console.log(err);
                    }
                    console.log("JSON file has been saved.");
                });

                //on affiche ce que l'on vient d'ajouter dans le postman
                res.json({
                    message : 'just added',
                    movie :{movie, id}
                });
            }
        });
});


/* UPDATE movie  ---------------------------------------------------------------------------------------------------- */
router.post('/:id', (req, res) =>{
    const {id} = JSON.stringify(req.params.id);
    console.log("l'id est " + JSON.stringify(req.params.id));
    const {movieName}= JSON.stringify(req.body.movie);
    console.log("el film est " + JSON.stringify(req.body));


   // const movieToUpdat = _.find(movies,["id",id]);


    var jsonData = JSON.stringify(data);
// parse json
    var jsonObj = JSON.parse(jsonData);



    var movieToUpdate = _.find(jsonObj,["id",id]);
//TODO: le console log ne marche pas
    console.log("movie to update = " + movieToUpdate[1].movie);

    movieToUpdate.movie=movieName;
    res.json({
        message:`just update ${id} with ${movieName}`
    });
});


/* DELETE movie   --------------------------------------------------------------------------------------------------- */
router.delete('/:id', (req, res) =>{
    var jsonData = JSON.stringify(data);
    var jsonObj = JSON.parse(jsonData);

    const {id} = req.params;
    _.remove (movies, ["id",id]);
    res.json({
        message:`just remove ${id}`
    });
});


// -------------------------------------------------------------------------------------------------------------------
// dans router.get on met axios.get

module.exports = router;




