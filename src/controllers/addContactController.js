import AddContact from "../models/AddContactModel.js";

function redirectBack(req, res, condition, msg) {
    req.flash(condition, msg);
    req.session.save(function () {
        return res.redirect('index');
    });
}

const AddContactController = {
    index(req, res) {
        res.render('addContact');
    },

    async add(req, res) {
        const addContact = new AddContact(req.body, req.session.user);
        await addContact.addContact();
        
        if (addContact.errors.length > 0) {
            return redirectBack(req, res, 'errors', addContact.errors);
        }

        return redirectBack(req, res, 'success', 'Contact added!');
    }
}

export default AddContactController;