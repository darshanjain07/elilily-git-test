const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app)

const port = 9000
app.set('port', port)

// CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,secret_key');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
  });
  

// API Routes
const gitHubApi = require('./server/api/github')

app.use('/github', gitHubApi)

server.listen(port, ()=> console.log('API server is running on port: ' + port))