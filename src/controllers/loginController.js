import Login from "../models/LoginModel.js";

function redirectBack(req, res, condition, msg) {
    req.flash(condition, msg);
    req.session.save(function () {
        return res.redirect('index');
    });
}

const LoginController = {
    index(req, res) {
        if (req.session.user) return res.redirect('/');
        res.render('login');
    },

    async login(req, res) {
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            return redirectBack(req, res, 'errors', login.errors);
        }

        req.session.user = login.user;
        return redirectBack(req, res, 'success', 'Logged in!');
    },

    logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
}

export default LoginController;