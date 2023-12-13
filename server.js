const express = require('express');
const bodyParser = require('body-parser');
const request = require('supertest');
const passport = require('passport')
const mongodb = require('./data/database');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Change later to only allow our server
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
  next();
});
app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } 
  else {
    app.listen(port, () => {
        console.log(`Database is listening and running on port ${port}`);

        // Route Testing
        request(app)
          .get('/albums')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) throw err;
            else console.log('Album route works properly.');
          });

        request(app)
          .get('/users')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) throw err;
            else console.log('Users route works properly.');
          });
        
        request(app)
          .get('/threads')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) throw err;
            else console.log('Threads route works properly.');
          });

        request(app)
          .get('/posts')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) throw err;
            else console.log('Posts route works properly.');
          })
      });
    }
});

