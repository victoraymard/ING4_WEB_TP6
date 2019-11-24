var express = require('express');
var router = express.Router();
// Lodash utils library
const _ = require('lodash');
const data = require('../bdd.json');


// Create RAW data array
let users = [
    {
      user : "Arthur",
      id : "0"
    },
  {
    user : "Nico",
    id : "1"
  }
];


/* GET users listing. */
router.get('/', function(req, res, next) {
  /*res.send('respond with a resource yo');*/
//  res.status(200).json({users});
    res.send(JSON.stringify(data)); //permet d'affcher les données issues du json
});

/* GET one user by id */
router.get('/:id', (req, res)=>{
    // Get id in params
    const {id}= req.params;
    //find user in the database
    const user = _.find(data,["id",id]);

    //return de l'user avec le message
    res.send(JSON.stringify({
            message : 'User found :)',
            user
        }));
});


/* PUT new music from api into ddb */
router.put('/',(req,res)=>{
    //Get the data from request from request
    const { user } = req.body;
    //Create new unique id
    const id = _.uniqueId();
    //Insert it in the ddb
    data.push({user, id});
    //Return message
    res.json({
        message: 'Just added ${id}',
        user:{user, id}
    });
});

// dans router.get on met axios.get

module.exports = router;
