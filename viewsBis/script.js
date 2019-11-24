

function getTheMovie(){
    let movie='oss117';
    //on rentre la variable en entrée dans la variable movie
    if(document.getElementById('movie-input').value)
        movie=document.getElementById('movie-input').value;
    else console.log("pas de film en entrée, le film est "+ movie);


    console.log("eh merde, on est bloqué avant la création de l'api");
    // Création de l'objet api omdb
    const apiOmdb = new API_OMDB(movie);
    console.log("en fait non, ça va :)");

    apiOmdb
        .viewTheMovie()
        .then(function (response) {
            console.log("youpi, mon api est créee");
            // Récupère la donnée d'une API
            /*  const data = response.data;


              console.log("tout se passe bien");
              // On récupère le nom du film
              const title = data.movie.Title;
              const released = data.movie.Released;
              //on récupère le poster dans une img
              const poster = apiOmdb.getPoster(data.movie.Poster);




              document.getElementById('movie-name').innerHTML = title;
              console.log("le titre de mon film est "+title);*/
        })


}

