var data_from_rasp = {};
var data_to_rasp = {
    "tarX": -1,
    "tarY": -1,
    "mode": "",
    "lift_land": false,
    "emergency_stop": false,
    "translation_P_gain": 0,
    "translation_D_gain": 0,
    "yaw_P_gain": 0,
    "yaw_D_gain": 0,
    "command": "",
    "arg1": 0,
    "arg2": 0
};

//////////// EXPRESS //////////// 
const express = require('express')
const app = express()
const port_exp = 3000

app.use(express.json())
app.use(express.static('public'))

app.get('/rpi-data', (req, res) => {
    res.send(JSON.stringify(data_from_rasp));
});

app.post('/update-cmd', (req, res) => {
    data_to_rasp = JSON.stringify(req.body);
    console.log(data_to_rasp);
    res.send("");
});

app.listen(port_exp, () => console.log(`Example app listening at http://localhost:${port_exp}`))
////////////////////////////////


////////// WEBSOCKET //////////// 
var WebSocketServer = require('websocket').server;
var http_py = require('http');

var server_py = http_py.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
});
server_py.listen(4000, function() { 
    console.log("Waiting for Communicationsmodule");
});

// create the server
wsServer = new WebSocketServer({
    httpServer: server_py
});

// WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            // process WebSocket message
            //console.log(message.utf8Data);
            data_from_rasp = JSON.parse(message.utf8Data);
            console.log("Python: data recived. Sending data");
            connection.send(JSON.stringify(data_to_rasp))
        }
    });

    connection.on('close', function(connection) {
        // close user connection
        console.log("Communicationsmodule disconnected");
    });
});
////////////////////////////////
