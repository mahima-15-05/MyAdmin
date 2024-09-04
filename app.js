const http = require('http') ;
const express = require('express') ;
const logger = require('morgan');
const bodyParser = require('body-parser');
// const session = require('express-session');


const path = require('path');
const hostname = '127.0.0.1';
const port = 3000;
const app = express() // setup express application
const server = http.createServer(app);

// express-toastr
// var express = require('express')
// Dependencies
    const flash = require('connect-flash')
    const session = require('express-session')
    const cookieParser = require('cookie-parser')
// express-toastr
    const toastr = require('express-toastr');
// express-toastr end

// app.use(logger('dev')); // log requests to the console

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("dotenv").config();

app.use(cookieParser('secret'));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000
    },
  })
);
app.use(flash());
app.use(toastr());

app.use(express.static(path.join(__dirname, "public")));
app.get('*.js', (req, res, next) => {
  res.set('Content-Type', 'application/javascript');
  next();
});
app.use('/public', express.static('public', {
  // Set the correct MIME type for JavaScript files
  setHeaders: (res, path, stat) => {
      if (path.endsWith('.js')) {
          res.setHeader('Content-Type', 'text/javascript');
      }
  }
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "server/views"));

const indexRoute = require('./server/routes/indexRoute')
app.use("/", indexRoute); 


app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the default API route',
}));

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});