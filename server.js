const express = require('express');
const server = express();
const cors = require('cors');
const morgan = require("morgan");
const helmet = require("helmet");

const projectsRouter = require('./projects/projectsRouter.js');

// global middleware
server.use(express.json())
server.use(cors());
server.use(logger);
server.use(morgan("combined"));
server.use(helmet());

server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Don't worry, Be Happy!</h2>`);
});

//custom middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );
  next();
}

module.exports = server;
