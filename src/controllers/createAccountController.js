import CreateAccount from "../models/CreateAccountModel.js";

function redirectBack(req, res, condition, msg) {
    req.flash(condition, msg);
    req.session.save(function () {
        return res.redirect('index');
    });
}

const CreateAccountController = {
    index(req, res) {
        res.render('createAccount');
    },

    async create(req, res) {
        const createAccount = new CreateAccount(req.body);
        await createAccount.createAccount();
        
        if (createAccount.errors.length > 0) {
            return redirectBack(req, res, 'errors', createAccount.errors);
        }

        return redirectBack(req, res, 'success', 'Account created successfully!');
    }
}

export default CreateAccountController;