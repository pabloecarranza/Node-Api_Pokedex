const express = require('express');
const port = 3002;
const app = express();
const rp = require('request-promise');
const cors = require('cors'); 

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
app.get('/api', (request, response) => {
    rp('https://pokeapi.co/api/v2/pokemon?limit=25').then(body => {
        response.send(body);
    }).catch(err => {
        console.log(err);
    });
});

app.get(`/api/:userId`, (request, response) => {
    const name = request.params.userId
    rp(`https://pokeapi.co/api/v2/pokemon/${name}`).then(body => {
        response.send(body);
    }).catch(err => {
        console.log(err);
    });
});

app.use(cors());

const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`> Ready on http://localhost:${server.address().port}`)
});