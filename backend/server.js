const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const mongoose = require('mongoose');

// Import middlewares
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// Import routes
const usersRoute = require('./routes/users');
const notesRoute = require('./routes/notes');


// Auth
require('./config/passport');

// Initialize app
const app = express();

process.env.MONGO_DB_URI = 'mongodb://127.0.0.1:27017/notesproject';
process.env.SESSION_SECRET = 'e419c0a23966e3c258653b53ed3847258266dbc8cc1a671ca7450ef98e011988';

// Connect to MongoDB using Mongoose

  mongoose.connect(process.env.MONGO_DB_URI)
  .then(()=>{
      console.log("mongodb connected");
  })
  .catch(()=>{
      console.log('failed');
  })

// Session
const sessionStore = new MongoStore({
	mongoUrl: process.env.MONGO_DB_URI,
});

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		store: sessionStore,
		cookie: {
			maxAge: 1000 * 3600 * 24,
		},
	})
);

// Passport Middlewares
app.use(passport.initialize());
app.use(passport.session());

// Body parser
app.use(express.json());

// Middlewares
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());

// Mount routes
app.use('/users', usersRoute);
app.use('/notes', notesRoute);

// Listen for requests
const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Listening for requests on ${PORT}`);
});
