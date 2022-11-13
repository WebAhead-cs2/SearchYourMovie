const fs = require('fs');
const path = require('path');

function getMovieArr(){
    fs.readFile(path.join(__dirname, "moviesList.txt"), {encoding: "utf-8"}, (error, file) =>{
        if(error){
            console.error();
        } else{
            //console.log("file Length: " + file.length);
            const moviesList = file.split('\n');
            //console.log(moviesList[30]);
        } 
    });
}

module.exports = getMovieArr;
