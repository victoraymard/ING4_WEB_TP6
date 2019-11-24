// API : http://www.omdbapi.com/

// Clé api
const API_KEY = "37e44ebf";
// Url API
const API_URL = "http://www.omdbapi.com/";
const API_URL_BIS = "https://api.openweathermap.org/data/2.5/forecast/daily";
// Base source icon
const API_URL_ICON = "http://openweathermap.org/img/wn/";

const API_OSS_117 = "http://www.omdbapi.com/?apikey=37e44ebf&t=oss+117";


//http://www.omdbapi.com/?apikey=[yourkey]&
//http://www.omdbapi.com/?apikey=37e44ebf&t=oss+117

//http://www.omdbapi.com/?t=oss+117&y=2009
//


class API_OMDB{
    constructor(movie){
        this.movie = movie;
        console.log("ouf");
    }

    getHTMLElementFromIcon(icon){
        return `<img src=${API_URL_ICON}${icon}@2x.png class="weather-icon"/>`
    }

    getPoster(thePoster){
        return '<img src=${thePoster}/>'
    }

    viewTheMovie(){ //pour avoir les infos sur le film
        console.log("viev the movie");
        return axios
            .get(`${API_OSS_117}`, {
                crossdomain: true
            }),
            console.log("viev the movie -- end ");
    }
}


//ca marche
//`${API_URL}?apikey=${API_KEY}&?t=${this.movie}`