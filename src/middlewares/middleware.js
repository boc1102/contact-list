import csrf from 'csurf';
import Database from "better-sqlite3";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const globalMiddleware = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  next();
}

function loginRequired(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login/index')
  }

  next()
}

const check404Error = (err, req, res, next) => {
  console.log(err);

  res.status(404).render('404');
};

const csrfProtection = csrf({ cookie: true });

const csrfMiddleware = [
  csrfProtection,
  (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next()
  }
];

const checkCsrfError = (err, req, res, next) => {
  console.log(err);

  if (err.code == 'EBADCSRFTOKEN') {
    return res.status(303).render('404');
  }

  res.status(500).send('Internal Error');
};

export default { check404Error, loginRequired, csrfMiddleware, checkCsrfError, globalMiddleware};