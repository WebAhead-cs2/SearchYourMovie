//const convertToArr = require("../convertToArr");
const searchBtn = document.getElementById('searchBtn');
const actorsUL = document.getElementById('actorsList');
let searchTxt = '';
let actorName = '';
//const actors = [];
searchBtn.addEventListener('click', getText);
function getText() {
  searchTxt = document.getElementById('searchInput').value;
  searchTxt = searchTxt.replaceAll(' ', '+');
  console.log(searchTxt);
  getMovie()
    .then((movie) => {
      console.log(movie);
      // get movie properties and show them on html via DOM >>>
      document.querySelector('h2').textContent = movie.Title;
      document.querySelector('h4').textContent = movie.Released;

      // get the Runtime of the movie, parse it to a number, then get hours and minutes >>>
      const runTime = parseInt(movie.Runtime.slice(0, movie.Runtime.indexOf(' ')));
      const hrs = Math.floor(runTime/60);
      const mins = runTime%60;
      document.getElementById('runTime').textContent = hrs + 'h ' + mins + 'm';
      if(movie.Poster !== null){
        document.querySelector('img').src = movie.Poster;
      } else{
        document.querySelector('img').src = '/src/noImage.jpg';
      }
      document.getElementById('plot').textContent = movie.Plot;
      document.getElementById('director').textContent = movie.Director;
      document.getElementById('writer').textContent = movie.Writer;
      actors = movie.Actors.split(", ");
      for(let actor of actors){
        actorName = actor.replaceAll(' ', '%20');
        const a = document.createElement('a');
        const item = document.createElement('li');
        item.textContent = actor;
        a.appendChild(item);
        a.href = '/src/actorDetails.html';
        actorsUL.appendChild(a);
        
      }
      console.log(actors);
      //document.getElementById('actors').textContent = movie.Actors;
      document.getElementById('boxoffice').textContent = movie.BoxOffice;
    })
    .catch(() => {
      document.querySelector('h2').textContent = 'Not Found!!'
    });
  return searchTxt;
}

//console.log(actors[2]);

function getMovie() {
  return fetch(`https://www.omdbapi.com/?apikey=9494bca&t=${searchTxt}&plot=full`)
    .then((response) => response.json());
}


// function getList(){
//     return fetch("https://www.imdb.com/list")
//     .then(response => response.json());
// }

// getList()
// .then(data => console.log(data))
// .catch(console.error());
