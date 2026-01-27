import Login from "../models/LoginModel.js";

function redirectBack(req, res, condition, msg) {
    req.flash(condition, msg);
    req.session.save(function () {
        return res.redirect('index');
    });
}

const LoginController = {
    index(req, res) {
        res.render('login');
    },

    login(req, res) {
        const login = new Login(req.body);
        login.login();
        
        if (login.errors.length > 0) {
            return redirectBack(req, res, 'errors', login.errors);
        }

        req.session.user = login.user;
        return redirectBack(req, res, 'success', 'Logged in!');
    }
}

export default LoginController;