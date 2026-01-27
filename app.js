import express from 'express';
import session from 'express-session';
import flash from 'connect-flash';
import routes from './routes.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import middleware from './src/middlewares/middleware.js';

const __dirname = import.meta.dirname;
const app = express();

// Session
const sessionOptions = session({
    secret: 'akasdfj0út23453456+54qt23qv  qwf qwer qwer qewr asdasdasda a6()',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// (Webpack output)
app.use(express.static(path.join(__dirname, "dist")));

// Body
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(middleware.globalMiddleware);

app.use(middleware.csrfMiddleware);

// Routes
app.use('/', routes);

app.use(middleware.check404Error);
app.use(middleware.checkCsrfError)

export default app;