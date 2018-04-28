module.exports = class Pinger {
  ping() {
    const http = require('http');
    const express = require('express');
    const app = express();
    app.get("/", (request, response) => {
      console.log(">> " + Date.now() + " Ping Received");
      response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
      http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);
  }
  reload() {
    const express = require('express');
    const app = express()
    app.get('/', (req, res) => { 
      res.send('Express.js server reloaded.')
      console.log(`>> EXPRESS.JS server reloaded at ${Date.now}`);
      res.sendStatus(200);
      app.close();
      app.listen(process.env.PORT);
    });
  }
}