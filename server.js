const http = require('http');
const router = require('./router.js');

const server = http.createServer(router);

server.on('listening', () => console.log('Server is running...'));
server.listen(3000, () => console.log(`Listening at http://localhost:3000`));