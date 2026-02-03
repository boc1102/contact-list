import UpdateContact from "../models/UpdateContactModel.js";

const UpdateContactController = {
    index(req, res) {
        const updateContact = new UpdateContact(req.body, req.session.user);

        res.render('update', { query: req.query, contact: updateContact.getContact(req.query.id) });
    },

    update(req, res) {
        const updateContact = new UpdateContact(req.body, req.session.user);

        updateContact.updateContact(req.query.id);
        
        if (updateContact.errors.length > 0) {
            req.flash('errors', updateContact.errors);
        } else {
            req.flash('success', 'Contact edited!');
        }

        res.redirect('/');
    }
}

export default UpdateContactController;