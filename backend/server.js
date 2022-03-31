const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');

// Import middlewares
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// Import routes
const usersRoute = require('./routes/users');
const notesRoute = require('./routes/notes');

// Import DB config
const connectDB = require('./config/connectDB');

// Load env variables
dotenv.config({ path: './config/.env' });

// Auth
require('./config/passport');

// Initialize app
const app = express();

// Connect mongo db
connectDB();

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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Listening for requests on ${PORT}`);
});
