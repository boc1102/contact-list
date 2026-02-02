import csrf from 'csurf';
import Database from "better-sqlite3";
import path from 'path';

const __dirname = import.meta.dirname;

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

function loadData(req, res, next) {
  const db = new Database(path.resolve(__dirname, '../../data/data.db'), { verbose: console.log });
  db.pragma('journal_mode = WAL');

  const user = req.session.user;

  try {
    const tableName = `contacts_${user.id}`;

    db.exec(`
            CREATE TABLE IF NOT EXISTS ${tableName} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT,
            email TEXT,
            phone_number TEXT
            )`);

    res.locals.contacts = db.prepare(`SELECT * FROM ${tableName};`).all();
  } catch (error) {
    console.log(error);
    console.log(this.errors);
  } finally {
    db.close();
  }

  next();
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

export default { check404Error, loginRequired, csrfMiddleware, checkCsrfError, globalMiddleware, loadData };