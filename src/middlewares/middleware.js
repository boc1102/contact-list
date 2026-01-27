import csrf from 'csurf';

const globalMiddleware = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
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

export default { check404Error, csrfMiddleware, checkCsrfError, globalMiddleware };