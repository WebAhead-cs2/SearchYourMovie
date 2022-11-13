const homeHanler = require('./handlers/home');
const srcHandler = require('./handlers/src');
const missingHandler = require('./handlers/missing');

function router(request, response){
    const url = request.url;
    if(url === '/'){
        homeHanler(request, response);
    } else if(url.includes('src')){
        srcHandler(request, response);
    }
    else{
        missingHandler(request, response);
    }

}

module.exports = router;