const express = require('express');
const app = express();
const {Server} = require('socket.io');
const { createServer } = require("http");
const httpServer = createServer(app);
const io = new Server(httpServer);
const path = require('path');



//settings
app.set('port',process.env.PORT || 8000);
app.use(express.static(path.join(__dirname, 'public')));

//rutes
app.use(require('./rutes/index'));
require('./socket')(io);

//servidor
app.listen(app.get('port'),()=>{
    try {
        console.log(`server on port ${app.get('port')}`)
    } catch (error) {
        console.error(error)
    }
});

httpServer.listen(process.env.PORT ||  3000);

