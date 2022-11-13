const fs = require("fs");
const path = require("path");
const types = {
  html : "text/html",
  css : "text/css",
  js : "text/javascript",
  jpg : "image/jpeg",
  ico : "image/x-icon"
};

function srcHandler(request, response) {
    const url = request.url;
    const extension = url.slice(url.indexOf('.')+1);
    console.log("EXE : " + extension);
    const type = types[extension];
    const filePath = path.join(__dirname, "..", url);
    fs.readFile(filePath, (error, file) => {
      if (error) {
        console.log(error);
        response.writeHead(404, { "content-type": "text/html" });
        response.end("<h1>Not found</h1>");
      } else {
        response.writeHead(200, { "content-type": type });
        response.end(file);
      }
    });
}

module.exports = srcHandler;