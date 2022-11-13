const fs = require('fs');
const path = require("path");

function homeHanler(request, response) {
    const filePath = path.join(__dirname, "..","src","index.html");
    fs.readFile(filePath, (error, file) => {
        if (error) {
            console.log(error);
            response.writeHead(404, { "content-type": "text/html" });
            response.end("<h1>Not found</h1>");
        } else{
            response.writeHead(200, { 'contet-type': 'text/html' });
            response.end(file);
        }
    });
}

module.exports = homeHanler;
